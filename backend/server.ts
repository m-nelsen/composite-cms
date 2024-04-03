import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

if (!PORT) {
  console.error("A 'PORT' is not defined in your environment file");
}

app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
