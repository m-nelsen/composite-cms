import { Request, Response, Router } from "express";

const router = Router();

// Returns the one story that corresponds to slug
router.get("/:slug", async (req: Request, res: Response) => {
  //   try {
  //     const { slug } = req.params;

  //     if (!slug) {
  //       res.sendStatus(400);
  //     }

  //     const getStory = await Story.find({ slug });

  //     if (!getStory) {
  //       res.sendStatus(400);
  //     }

  //     res.status(200).json(getStory);
  //   } catch (error) {
  //     console.log("error: ", error);
  //     res.sendStatus(400);
  //   }

  const { slug } = req.params;
  res.send(`GET request for ${slug} route`);
});

// Returns all stories
// router.get("/", async (_req: Request, res: Response) => {
//   try {
//     const getStory = await Story.find();
//     res.status(200).json(getStory);
//   } catch (error) {
//     console.log("error: ", error);
//     res.sendStatus(400);
//   }
// });

export default router;
