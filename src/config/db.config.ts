import mongoose from "mongoose"

/**
 * connectDB
 *
 * Function to establish connection with MongoDB
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI as string;

    await mongoose.connect(mongoURI)

    console.log("MongoDB Connected Successfully")
  } catch (error) {
    console.error("MongoDB Connection Error:", error)
    process.exit(1)
  }
}