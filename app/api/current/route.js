import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/app/models/user";

export async function GET(request) {
  try {
    const authToken = request.cookies.get("logintoken")?.value;

    // 👉 If user is NOT logged in
    if (!authToken) {
      return NextResponse.json(
        { user: null, message: "User not logged in" },
        { status: 200 },
      );
    }
    const data = jwt.verify(authToken, "your_jwt_secret_key");

    const user = await User.findById(data._id);
    console.log(user);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { User } from "@/app/models/user";

// export async function GET(request) {
//   try {
//     const authToken = request.cookies.get("logintoken")?.value;

//     // 👉 If user is NOT logged in
//     if (!authToken) {
//       return NextResponse.json(
//         { user: null, message: "User not logged in" },
//         { status: 200 }, // important: NOT an error
//       );
//     }

//     const data = jwt.verify(authToken, "your_jwt_secret_key");

//     const user = await User.findById(data._id);

//     return NextResponse.json({ user });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Invalid or expired token" },
//       { status: 401 },
//     );
//   }
// }
