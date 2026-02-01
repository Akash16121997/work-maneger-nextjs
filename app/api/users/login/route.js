import { User } from "@/app/models/user";
import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
var jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";

connectDb();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1️⃣ Find user ONLY by email
    const user = await User.findOne({ email });

    // 2️⃣ Check user existence
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 3️⃣ Compare hashed password
    const matched = bcrypt.compareSync(password, user.password);

    if (!matched) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 4️⃣ Generate JWT (NO callback)
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      "your_jwt_secret_key",
      { expiresIn: "1h" },
    );

    // 5️⃣ Success response
    const response = NextResponse.json(
      {
        message: "Login success",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );

    response.cookies.set("logintoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error logging in",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
