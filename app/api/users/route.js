import { User } from "@/app/models/user";
import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDb();
export async function GET(request) {

  try {
    const users = await User.find();
    console.log("fetched sucessfully");
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching users",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, password, about, profileUrl } = body;

    const user = new User({
      name,
      email,
      password,
      about,
      profileUrl,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating user",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export function PUT(request) {
  return NextResponse.json({ message: "PUT method" });
}

export async function DELETE(request, { params }) {
  const { userid } = params;
  try {
    await User.deleteOne({ _id: userid });
    return NextResponse.json({
      message: "User deleted successfully",
      stats: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting user",
    });
  }
}
