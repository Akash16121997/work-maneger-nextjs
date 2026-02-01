"use client";
import React from "react";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    message:
      "WorkManager helped our team stay organized and meet deadlines effortlessly. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Smith",
    role: "Developer",
    message:
      "I love the simplicity and clarity of WorkManager. Tasks are easier to track now.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sara Lee",
    role: "Designer",
    message:
      "The interface is intuitive and responsive. Makes collaboration so much easier!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Brown",
    role: "CEO",
    message:
      "Implementing WorkManager transformed our workflow. Productivity increased significantly.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emily Davis",
    role: "Marketing Lead",
    message:
      "We can now track campaigns and tasks effortlessly. Love the dashboard!",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "James Wilson",
    role: "HR Manager",
    message:
      "Assigning and monitoring tasks has never been easier. The team loves it!",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    name: "Olivia Martinez",
    role: "Product Designer",
    message:
      "WorkManager's intuitive design makes my daily task planning smooth and enjoyable.",
    avatar: "https://randomuser.me/api/portraits/women/73.jpg",
  },
  {
    name: "Daniel Taylor",
    role: "Backend Engineer",
    message:
      "I can now focus on coding without worrying about missing tasks. Truly helpful!",
    avatar: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    name: "Sophia Anderson",
    role: "Content Strategist",
    message:
      "Organizing content projects is so much easier now. WorkManager is a lifesaver!",
    avatar: "https://randomuser.me/api/portraits/women/88.jpg",
  },
];


const TestimonialSection = () => {
  return (
    <section className=" bg-gradient-to-br from-blue-400 to-indigo-700 relative py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>

        {/* Carousel container */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex-none w-80 bg-white rounded-2xl p-6 shadow-lg
              snap-center transition-transform transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{t.message}</p>
            </div>
          ))}
        </div>
      </div>

   
      {/* Inline style to hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
