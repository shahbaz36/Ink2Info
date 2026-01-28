import mongoose from "mongoose";

const MONGODB_URI = Bun.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please degine the MONGODB_URI environment variable inside .env.local");
}

if (!globalThis.mongoose) {
  globalThis.mongoose = { conn: null, promise: null };
}
let cached = globalThis.mongoose;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
