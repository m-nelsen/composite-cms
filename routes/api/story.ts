import { Request, Response, Router } from "express";
import Story from "../../models/story";
import { slugify } from "../../utils/index";

const router = Router();

// Returns all stories
router.get("/", async (_req: Request, res: Response) => {
  try {
    const getStory = await Story.find();
    res.status(200).json(getStory);
  } catch (error) {
    console.log("error: ", error);
    res.sendStatus(400);
  }
});

// Returns the one story that corresponds to slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.sendStatus(400);
    }

    const getStory = await Story.find({ slug });

    if (!getStory) {
      res.sendStatus(400);
    }

    res.status(200).json(getStory);
  } catch (error) {
    console.log("error: ", error);
    res.sendStatus(400);
  }
});

// Creates a new story
router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req?.body) {
      res.sendStatus(400);
    }

    const {
      featuredMedia,
      body,
      title,
      author,
      dateCreated,
      dateLastEdited,
      type,
    } = req.body;

    let slug = slugify(title);

    const newStory = new Story({
      featuredMedia,
      body,
      title,
      author,
      dateCreated,
      dateLastEdited,
      slug,
      type,
    });

    await newStory.save();

    res.sendStatus(201);
  } catch (error) {
    console.log("error: ", error);
    res.sendStatus(400);
  }
});

// Deletes the one story that corresponds to id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);
    }

    const deletedStory = await Story.deleteOne({ _id: id });

    if (!deletedStory) {
      res.sendStatus(500);
    }

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
