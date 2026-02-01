"use client";

import React, { useContext, useEffect, useState } from "react";
import { DeleteTaskForUser, getTasksForUser } from "../services/taskservice";
import UserContext from "../context/UserContext";
import Link from "next/link";
import Loader from "../components/Loading";
import { toast } from "react-toastify";

const page = () => {
  const [showtasks, setshowTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(true);

  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (user && user._id) {
      fetchTasks(user._id);
    }
  }, [user]);

  async function fetchTasks(userId) {
    try {
      setTaskLoading(true);
      const data = await getTasksForUser(userId);
      setshowTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setshowTasks([]);
    } finally {
      setTaskLoading(false);
    }
  }

  const handledelete = async (id) => {
    try {
      await DeleteTaskForUser(id);
      setshowTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted successfully")
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  // 🔄 Global auth loading
  if (loading || taskLoading) {
    return <Loader text="Fetching your tasks..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-2xl flex justify-center md:text-3xl font-bold mb-6 text-gray-800">
        My Tasks
      </h1>

      {/* Empty State */}
      {showtasks.length === 0 ? (
        <div className="text-center flex justify-center text-gray-500">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-[50%]"
              src="https://img.freepik.com/premium-vector/modern-design-concept-no-task-available-design_637684-258.jpg"
              alt="No tasks"
            />
            <Link href="/addtask">
              <button className="mt-4 bg-blue-800 hover:bg-blue-700 transition cursor-pointer p-4 rounded-2xl text-white">
                + Add New Task
              </button>
            </Link>
          </div>
        </div>
      ) : (
        /* Tasks Grid */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showtasks.map((task) => (
            <div
              key={task._id}
              className="relative bg-amber-100 rounded-2xl border border-gray-100 shadow-sm
              hover:shadow-xl transition-all duration-300
              hover:-translate-y-1 p-5 flex flex-col"
            >
              {/* Delete Icon */}
              <button
                className="absolute top-3 right-3 p-2 rounded-full  cursor-pointer hover:bg-red-100 transition"
                title="Delete Task"
                onClick={() => handledelete(task._id)}
              >
                <img
                  src="https://www.svgrepo.com/show/499905/delete.svg"
                  alt="Delete"
                  className="w-6 h-6"
                />
              </button>

              {/* Status Badge */}
              <span
                className={`w-fit mb-3  py-1 text-xs font-semibold rounded-full ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-red-500"
                }`}
              >
                {task.status || "pending"}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {task.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                {task.content}
              </p>

          
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
