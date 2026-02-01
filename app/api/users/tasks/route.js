import Task from "@/app/models/task";
import { connectDb } from "@/helper/db";
import { errormessage } from "@/helper/errorMessage";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDb();

export async function GET() {
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}



export async function POST(request) {
  try {
    const { title, content, status, UserId } = await request.json();

    const authToken = request.cookies.get("logintoken")?.value;
    const data = jwt.verify(authToken, "your_jwt_secret_key");

    const task = new Task({ title, content, status, UserId : data._id });
    const createdTask = await task.save();

    return NextResponse.json(
      { message: "Task created successfully", data: createdTask },
      { status: 201 },
    );
  } catch (error) {
    return errormessage("Failed to create task", 500, false);
  }
}
