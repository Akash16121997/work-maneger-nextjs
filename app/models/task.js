import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
