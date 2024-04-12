import { NextFunction, Request, Response, Router } from "express";
import viteMiddleware from "../middleware/vite";
import Story from "../models/story";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.locals = { global: "homepage", type: "homepage" };
  viteMiddleware(req, res, next);
});

// Returns the one story that corresponds to slug
router.get("/favicon.ico", async (_req: Request, res: Response) => {
  res.sendStatus(204);
});

// Returns the one story that corresponds to slug
router.get(
  "/:slug",
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;

    const getStory = await Story.find({ slug });

    res.locals.global = { global: getStory, type: "story" };
    viteMiddleware(req, res, next);
  }
);

export default router;
