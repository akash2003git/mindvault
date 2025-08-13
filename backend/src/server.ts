import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

// Load enviornment variables
dotenv.config();
import { PORT } from "./config/env";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to MindVault API!");
});

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`MindVault backend server running on port ${PORT}`);
  });
}
startServer();
