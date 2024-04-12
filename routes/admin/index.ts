import { NextFunction, Request, Response, Router } from "express";
import viteMiddleware from "../../middleware/vite";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.locals = { global: "admin", type: "admin" };
  viteMiddleware(req, res, next);
});

export default router;
