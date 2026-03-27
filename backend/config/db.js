import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  console.log("Attempting to connect to MongoDB with URI:", MONGODB_URI);

  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not found in environment variables. Database features will be disabled.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
