"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { addUser } from "../services/userservice";
import Link from "next/link";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileUrl:
      "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
  });

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const dosignup = async (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
      return;
    }
    try {
      const response = await addUser(signupData);
      if (response) {
        toast.success("Signup successful! You can now log in.", {
          position: "top-center",
        });
        setSignupData({
          name: "",
          email: "",
          password: "",
          about: "",
          profileUrl: "",
        });
      }
    } catch (error) {
      toast.error("error during signup", error);
    }
  }; // ✅ function properly closed

  return (
    <>
      {/* Inline animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .slideIn-1 { animation: slideIn 0.5s ease-out 0.1s forwards; opacity: 0; }
        .slideIn-2 { animation: slideIn 0.5s ease-out 0.2s forwards; opacity: 0; }
        .slideIn-3 { animation: slideIn 0.5s ease-out 0.3s forwards; opacity: 0; }
        .popIn { animation: popIn 0.4s ease-out 0.4s forwards; opacity: 0; }
        .fadeIn { animation: fadeInUp 0.5s ease-out 0.5s forwards; opacity: 0; }
      `}</style>

      <div className="min-h-screen flex items-center justify-center gap-16 bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6159/6159448.png"
          className="hidden md:block w-[35%]"
          alt="signup"
        />

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 fadeInUp">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
            <p className="text-sm text-gray-500 mt-1">
              Join WorkManager and stay productive
            </p>
          </div>

          <form className="space-y-4" onSubmit={dosignup}>
            <div className="slideIn-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="slideIn-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={signupData.email}
                onChange={(e) => {
                  const email = e.target.value.replace(/\s/g, "").toLowerCase();
                  setSignupData({ ...signupData, email });
                  setEmailError(
                    email && !isValidEmail(email) ? "Invalid email format" : "",
                  );
                }}
                onKeyDown={(e) => e.key === " " && e.preventDefault()}
                className="w-full mt-1 px-3 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="slideIn-3">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="slideIn-3">
              <label className="text-sm font-medium text-gray-700">About</label>
              <input
                type="text"
                value={signupData.about}
                onChange={(e) =>
                  setSignupData({ ...signupData, about: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className=" w-[50%] py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition popIn"
              >
                Sign Up
              </button>
              <button
                type=" button"
                onClick={() => {
                  setSignupData({
                    name: "",
                    password: "",
                    email: "",
                    about: "",
                    profileUrl: "",
                  });
                }}
                className=" w-[50%] py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition popIn"
              >
                Reset
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-6 fadeIn">
            Already have an account?{" "}
            <Link href="/LoginPage">
              <span className="text-blue-600 cursor-pointer hover:underline">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
