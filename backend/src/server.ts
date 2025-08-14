// Load enviornment variables
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config/env";

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import userAuthRoutes from "./routes/userAuthRoutes";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/user", userAuthRoutes);
app.use("/api/v1/user", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to MindVault API!");
});

// Error Handler
app.use(errorHandler);

// Start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`MindVault backend server running on port ${PORT}`);
  });
}
startServer();
