import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT: number = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to mindvault API" });
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

startServer();
