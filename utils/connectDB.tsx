import mongoose from "mongoose";
import { z } from "zod";

const envSchema = z.object({
  MONGO_URI: z.string().url(),
});

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);

  const env = envSchema.parse({
    MONGO_URI: process.env.MONGO_URI,
  });

  await mongoose.connect(env.MONGO_URI);
  console.log("wlkejfwlekjf");
}

export default connectDB;
