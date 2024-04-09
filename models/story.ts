import mongoose from "mongoose";

const storyContent = new mongoose.Schema({
  content: {
    type: mongoose.SchemaTypes.String,
  },
  type: {
    type: mongoose.SchemaTypes.String,
  },
});

const story = new mongoose.Schema({
  featuredMedia: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  body: {
    type: [storyContent],
    required: true,
  },
  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  dateCreated: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
  dateLastEdited: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
  slug: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  type: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

export default mongoose.model("Story", story);
