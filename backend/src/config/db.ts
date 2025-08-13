import mongoose from "mongoose";
import { MONGO_URI } from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1); // Exit if DB fails
  }
};

export default connectDB;
