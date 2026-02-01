"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { Logout } from "../services/userservice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { user, setUser, loading } = useContext(UserContext);

  /* 🔒 Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const dologout = async () => {
    try {
      const data = await Logout();
      toast.success(data.message);
      setUser(null);
      setIsOpen(false);
      router.push("/LoginPage");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-blue-950 text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              Work Manager
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/">Home</Link>
              <Link href="/addtask">Add Task</Link>
              <Link href="/ShowTask">Show Tasks</Link>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {loading ? null : user ? (
                <>
                  <span>Hello, {user.name}</span>
                  <button
                    onClick={dologout}
                    className="px-4 py-2 bg-green-600  cursor-pointer rounded-lg hover:bg-green-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/LoginPage">
                    <button className="px-4 py-2  cursor-pointer bg-green-600 rounded-lg">
                      Login
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="px-4 py-2  cursor-pointer bg-red-600 rounded-lg">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cursor-pointer text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50  cursor-pointer z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className={`fixed top-16 left-0 w-full ${isOpen && "border border-t border-t-white"} bg-blue-900  cursor-pointer z-50 md:hidden shadow-lg`}
        >
          <div className={`flex flex-col bg-blue-950 gap-4 px-6 py-6`}>
            <Link
              href="/"
              className=" text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/addtask"
              className=" text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              Add Task
            </Link>
            <Link
              href="/ShowTask"
              className=" text-white font-medium"
              onClick={() => setIsOpen(false)}
            >
              Show Tasks
            </Link>

            <hr className="border-white" />

            {loading ? null : user ? (
              <button
                onClick={dologout}
                className="bg-green-600  cursor-pointer  text-white font-medium px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/LoginPage"
                  className=" text-white  cursor-pointer "
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className=" text-white  cursor-pointer "
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default CustomNavbar;
