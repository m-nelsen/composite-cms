import express from "express";
import "./config/database.ts";
import { initVite } from "./config/vite.ts";

import apiStoryRoutes from "./routes/api/story.ts";
import rootRoutes from "./routes/index.ts";

// Environment variables
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
// This should be the directory that vite middleware is located in
const base = process.env.BASE || "/middleware";

// Create http server
const app = express();

app.use(express.json());

initVite({ isProduction, base, app });

// Routes
app.use("/api/story", apiStoryRoutes);
app.use("/", rootRoutes);

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
