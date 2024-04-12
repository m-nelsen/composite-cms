import { Request, Response, NextFunction } from "express";
import { getViteInstance } from "../config/vite";
import { getHTMLPageType } from "../utils/index.ts";

export const viteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vite = getViteInstance();

  if (!vite) {
    return next(new Error("Vite server is not initialized"));
  }

  try {
    const isProduction = process.env.NODE_ENV === "production";

    const base = process.env.BASE || "/";
    const url: string = req.originalUrl.replace(base, "");

    const { type } = res.locals;

    const templateHtml = await getHTMLPageType({ isProduction, type });

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await getHTMLPageType({ isProduction, type });
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      //@ts-ignore
      render = (await import("/dist/server/entry-server.js")).render;
    }

    const dataTag = !!res?.locals
      ? `<script>window.composite = ${JSON.stringify(res.locals)};</script>`
      : null;

    const rendered = await render(res.locals);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace(`<!--app-data-->`, dataTag ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e: any) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
};

export default viteMiddleware;
