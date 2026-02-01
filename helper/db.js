import { User } from "@/app/models/user";
import mongoose from "mongoose";

export const connectDb = async () => {
  const MONGO_DB_URL =
    "mongodb+srv://akash:akash123@cluster0.skdkt.mongodb.net";

  try {
    const connection = await mongoose.connect(MONGO_DB_URL, {
      dbName: "workmaneger",
    });

    console.log("✅ Database connected successfully");
    const uuser = new User({
      name: "Test User",
      email: "a@gmail.com",
      password: "akash123",
      about: "This is a test user",
      profileUrl: "http://example.com/profile.jpg",
    });

    await uuser.save();
    console.log("schema added sucessfully");
    console.log("Host:", connection.connection.host);
  } catch (error) {
    console.error("❌ Failed to connect to database");
    console.error(error.message);
  }
};
