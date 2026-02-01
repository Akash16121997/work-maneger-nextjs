import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    about: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", userSchema);
