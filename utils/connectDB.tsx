import mongoose from "mongoose";
import { z } from "zod";

const envSchema = z.object({
  MONGO_URI: z.string().url(),
});

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);

  const env = envSchema.parse(process.env);

  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to DB");
}

export default connectDB;
