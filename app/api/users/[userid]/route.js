import { User } from "@/app/models/user";
import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";

connectDb();
export async function DELETE(request, { params }) {
  const { userid } = await params;
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

export async function GET(request, { params }) {
  const { userid } = await params;

  try {
    const user = await User.findById(userid);

    if (!user) {
      return NextResponse.json(
        { message: "User not found", status: "error" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User fetched successfully",
      status: "success",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { userid } = await params;
  console.log(userid)
  const { name, password, about, profileUrl } = await request.json();

  try {
    const user = await User.findById(userid);
    
    user.name = name || user.name;
    user.password = password || user.password;
    user.profileUrl = profileUrl || user.profileUrl;
    user.about = about || user.about;

    const updateuser = await user.save();
    return NextResponse.json(updateuser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}
