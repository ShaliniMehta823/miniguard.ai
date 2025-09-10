import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Cached connection (important for Next.js hot reload in dev).
 */
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } =
  (global as any)._mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      // options not needed in mongoose v6+, but could add poolSize, etc.
    });
  }

  cached.conn = await cached.promise;
  (global as any)._mongoose = cached;
  return cached.conn;
}
