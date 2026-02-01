"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-700 flex items-center justify-center px-4">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8
                      animate-fadeIn"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-sm text-gray-500 mt-1">
            We'd love to hear from you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message..."
              required
              className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-2 rounded-lg text-white font-semibold
            bg-blue-600 hover:bg-blue-700 transition
            ${loading ? "opacity-70 cursor-not-allowed" : " cursor-pointer"}`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
