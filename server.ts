import fs from "node:fs/promises";
import express, { Request, Response } from "express";
import "./config/database.ts";
import { getHTMLPageType } from "./utils/index.ts";

import rootRoutes from "./routes/index.ts";
import storyRoutes from "./routes/api/story.ts";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite: any;
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

app.use(express.json());

// Routes
app.use("/api/story", storyRoutes);
app.use("/", rootRoutes);

// Serve HTML
app.use("*", async (req: Request, res: Response) => {
  try {
    const url: string = req.originalUrl.replace(base, "");

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
      //@ts-ignore
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e: any) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
