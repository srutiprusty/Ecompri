import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI not set. Set it in .env.local as MONGODB_URI=");
}

const cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = ((globalThis as Record<string, unknown>)
  ._mongooseCache as typeof cached) || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {}).then((m) => m);
  }
  cached.conn = await cached.promise;
  (globalThis as Record<string, unknown>)._mongooseCache = cached;
  return cached.conn;
}
