import mongoose from "mongoose";
import { loadEnv } from "vite";

const { DB_URI } = loadEnv(
  process.env.NODE_ENV || "production",
  process.cwd(),
  ""
);

if (!DB_URI) {
  throw new Error("Database URI is not defined in environment file!");
}

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
