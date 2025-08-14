// Load enviornment variables
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config/env";

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import userAuthRoutes from "./routes/userAuthRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/user", userAuthRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to MindVault API!");
});

// Start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`MindVault backend server running on port ${PORT}`);
  });
}
startServer();
