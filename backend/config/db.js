import mongoose from "mongoose";

async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    if (!connect) {
      throw new Error("failed to connect Database");
    }
    return connect;
  } catch (error) {
    console.log("connection failed", error.message);
    throw error;
  }
}

export default connectDB;
