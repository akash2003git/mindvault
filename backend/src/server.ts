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
import oauthRoutes from "./routes/oauthRoutes";
import contentRoutes from "./routes/contentRoutes";
import tagRoutes from "./routes/tagRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", oauthRoutes);
app.use("/api/v1/user", userAuthRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/tags", tagRoutes);

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
