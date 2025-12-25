import mongoose from "mongoose";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("MONGO_URI is missing in environment variables");
}

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
}
