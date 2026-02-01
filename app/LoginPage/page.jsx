"use client";
import { useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/userservice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const router = useRouter();

  const doLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    try {
      await loginUser(loginData);
      toast.success("Login successful!", { position: "top-center" });
      router.push("/");
      window.location.reload();
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="login"
            className="w-3/4"
          />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Login to continue to WorkManager
          </p>

          <form className="mt-8 space-y-5" onSubmit={doLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value.replace(/\s/g, ""), // ✅ remove ALL spaces
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault(); // ✅ block space key
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData
                    .getData("text")
                    .replace(/\s/g, "");
                  setLoginData({ ...loginData, email: pastedText });
                }}
                placeholder="john@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg
              hover:bg-blue-700 transition active:scale-95"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link href="/signup">
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
