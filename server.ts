import fs from "node:fs/promises";
import express from "express";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

/*
  Get cached production asset from ./dist directory or fresh dev page from /src/pages/

  This function will eventually need to pull its url param from some sort of API call.
  url will eventually be a page type like "homepage", "admin", "section", "story"

  The purpose of pulling various HTML pages is to structure <meta> data differently
*/
const getHTMLPageType = async ({ isProduction, url }) => {
  // Maps desired URL to built HTML files
  const templatePagePaths = {
    admin: "src/page_types/admin/",
    homepage: "src/page_types/homepage/",
  };

  return await fs.readFile(
    `${isProduction ? "./dist/client/" : ""}${
      templatePagePaths[url] || ""
    }index.html`,
    "utf-8"
  );
};

// Cached production assets
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.get("/api", (req, res) => {
  res.send("Custom data from '/api' endpoints");
});

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    const templateHtml = await getHTMLPageType({ isProduction, url });

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await getHTMLPageType({ isProduction, url });
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
