import { Express } from "express";

let vite: any;

export const initVite = async ({
  isProduction,
  base,
  app,
}: {
  isProduction: boolean;
  base: string;
  app: Express;
}) => {
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
    app.use(compression());
  }
};

export const getViteInstance = () => {
  return vite;
};

export default { initVite, getViteInstance };
