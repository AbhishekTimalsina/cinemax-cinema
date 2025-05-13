import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoURI)
      .then((res) => {
        console.log("Connected to MongoDB Atlas successfully!");
        return res;
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
