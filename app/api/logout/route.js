import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );

    response.cookies.set("logintoken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // immediately expires
      path: "/", // IMPORTANT
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error logging out",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
