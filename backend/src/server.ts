import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";

import authRoutes from "./routes/authRoutes";
import vaultItemRoutes from "./routes/vaultItemRoutes";
import shareRoutes from "./routes/shareRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api", vaultItemRoutes);
app.use("/api/share", shareRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to mindvault API" });
});

const PORT: number = Number(process.env.PORT) || 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}

startServer();
