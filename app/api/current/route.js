import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/app/models/user";
import { connectDb } from "@/helper/db";

connectDb();

export async function GET(request) {
  try {
    const token = request.cookies.get("logintoken")?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data._id).select("-password");

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
