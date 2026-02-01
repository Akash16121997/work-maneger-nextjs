import Task from "@/app/models/task";
import { connectDb } from "@/helper/db";
import { errormessage } from "@/helper/errorMessage";
import { get } from "mongoose";
import { NextResponse } from "next/server";

connectDb();
export async function POST(request, { params }) {
  console.log(request, "params");
  const { title, content, UserId } = await request.json();
  try {
    const task = new Task({
      title,
      content,
      UserId,
    });
    const createdTask = await task.save();
    return NextResponse.json(createdTask, {
      status: 201,
      message: "Task created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}

export async function GET(request, { params }) {
  const { taskid } = await params;
  try {
    const task = await Task.findById(taskid);
    if (!task) {
      return NextResponse.json(
        { message: "Task not found", status: "error" },
        { status: 404 },
      );
    }
    return NextResponse.json({
      message: "Task fetched successfully",
      status: "success",
      task,
    });
  } catch (error) {
    return errormessage("Error fetching task", 500, false);
  }
}

export async function PUT(request, { params }) {
  const { taskid } = await params;
  const { title, content, status } = await request.json();
  try {
    const task = await Task.findById(taskid);

    task.title = title || task.title;
    task.content = content || task.content;
    task.status = status || task.status;
    const updatedTask = await task.save();

    return NextResponse.json({
      message: "Task updated successfully",
      status: "success",
      updatedTask,
    });
  } catch (error) {
    return errormessage("Error updating task", 500, false);
  }
}

export async function DELETE(request, { params }) {
  const { taskid } = await params;
  try {
    await Task.deleteOne({ _id: taskid });
    return NextResponse.json({
      message: "Task deleted successfully",
      status: "success",
    });
  } catch (error) {
    return errormessage("Error deleting task", 500, false);
  }
}
