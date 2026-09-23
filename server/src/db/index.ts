import mongoose from "mongoose";
import { DBNAME } from "../constance.js";

export const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DBNAME}`
    );

    console.log(
      `MongoDB connected || DB: ${connectionInstance.connection.name} || HOST: ${connectionInstance.connection.host}`
    );
  } catch (error: unknown) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};