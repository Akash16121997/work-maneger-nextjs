"use client";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import TestimonialSection from "./components/TestimoinalSection";

export default function Home() {
  return (
    <>
      {/* Inline animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .popIn { animation: popIn 0.4s ease-out forwards; opacity: 0; }

        .slideIn-1 { animation: fadeInUp 0.5s ease-out forwards; animation-delay: 0.1s; opacity:0; }
        .slideIn-2 { animation: fadeInUp 0.5s ease-out forwards; animation-delay: 0.2s; opacity:0; }
        .slideIn-3 { animation: fadeInUp 0.5s ease-out forwards; animation-delay: 0.3s; opacity:0; }
      `}</style>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-700 text-white">
        {/* Background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-6 fadeInUp">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Manage Your Tasks <br />
              <span className="text-blue-200">Smarter & Faster</span>
            </h1>

            <p className="text-lg text-blue-100 max-w-md slideIn-1">
              Organize your daily tasks, track progress, and stay productive
              with WorkManager.
            </p>

            <div className="flex gap-4 slideIn-2">
              <Link
                href="/addtask"
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg
                  hover:bg-blue-100 transition transform hover:scale-105"
              >
                Get Started
              </Link>

              <Link
                href="/ShowTask"
                className="px-6 py-3 border border-white/40 rounded-lg
                  hover:bg-white/10 transition"
              >
                View Tasks
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex justify-center slideIn-3">
            <img
              src="https://img.freepik.com/premium-vector/business-task-management-illustration-concept_701961-3283.jpg?w=2000"
              alt="Task Management"
              className="w-full max-w-md drop-shadow-xl popIn"
            />
          </div>
        </div>
        <TestimonialSection />
        {/* Contact Form */}
        <div className="fadeInUp">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
