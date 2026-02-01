import task from "@/app/models/task";
import next from "next";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userid } = await params;
  try {
    const tasks = await task.find({ UserId: userid });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}
