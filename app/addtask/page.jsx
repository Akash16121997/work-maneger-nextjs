"use client";
import React, { useState } from "react";
import { addtask } from "../services/taskservice";
import { toast } from "react-toastify";

const page = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "pending",
    UserId: "696297d0e76b9817e4cd8808",
  });

  const [loading, setLoading] = useState(false);

  const handleaddtask = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await addtask(task);
      toast.success(result?.message || "Task added successfully");

      setTask({
        title: "",
        content: "",
        status: "pending",
        UserId: "696297d0e76b9817e4cd8808",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Inline Animations – NO external CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .slideIn-1 {
          animation: slideIn 0.5s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .slideIn-2 {
          animation: slideIn 0.5s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .slideIn-3 {
          animation: slideIn 0.5s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .popIn {
          animation: popIn 0.4s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {loading ? (
          <loading />
        ) : (
          <>
            <form
              onSubmit={handleaddtask}
              className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg space-y-4 fadeInUp"
            >
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Add New Task
              </h2>

              {/* Task */}
              <div className="slideIn-1">
                <label className="block text-sm font-medium text-gray-700">
                  Task
                </label>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  placeholder="Enter task title"
                  className="w-full mt-1 px-3 py-2 border rounded-lg
              focus:ring-2 focus:ring-blue-500 outline-none
              transition transform duration-200 focus:scale-[1.01]"
                  required
                />
              </div>

              {/* Content */}
              <div className="slideIn-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  value={task.content}
                  onChange={(e) =>
                    setTask({ ...task, content: e.target.value })
                  }
                  placeholder="Enter task details"
                  rows="4"
                  className="w-full mt-1 px-3 py-2 border rounded-lg
              focus:ring-2 focus:ring-blue-500 outline-none
              transition transform duration-200 focus:scale-[1.01]"
                  required
                />
              </div>

              {/* Status */}
              <div className="slideIn-3">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={task.status}
                  onChange={(e) => setTask({ ...task, status: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg
              focus:ring-2 focus:ring-blue-500 outline-none
              transition transform duration-200 focus:scale-[1.01]"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 popIn">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg
              transition transform hover:bg-blue-700 hover:scale-[1.03]
              active:scale-95"
                >
                  Add Todo
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setTask({
                      title: "",
                      content: "",
                      status: "pending",
                      UserId: "696297d0e76b9817e4cd8808",
                    })
                  }
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg
              transition transform hover:bg-gray-400 hover:scale-[1.03]
              active:scale-95"
                >
                  Clear
                </button>
              </div>
            </form>
          </>
        )}

        {/* Form */}
      </div>
    </>
  );
};

export default page;
