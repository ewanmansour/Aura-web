import mongoose from "mongoose";
import dns from "node:dns";

export async function connectDb() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("MongoDB skipped: MONGO_URI is not set. Using fallback data.");
    return false;
  }

  // Handle Node.js/Windows DNS issues with mongodb+srv SRV records by falling back to public DNS
  if (uri.startsWith("mongodb+srv://")) {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (err) {
      console.warn("Unable to set custom DNS servers, attempting connection anyway:", err.message);
    }
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.warn(`MongoDB unavailable: ${error.message}. Using fallback data.`);
    return false;
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}
