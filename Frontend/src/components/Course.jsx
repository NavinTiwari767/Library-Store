
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "📖 Holy Books",
    description: "Spiritual and religious books.",
    bg: "bg-indigo-500",
    route: "/holy", // ✅ route add kiya
  },
  {
    name: "🧠 Philosophy",
    description: "Books on logic, reason, and thought.",
    bg: "bg-red-500",
    route: "/philosophy", // ✅ route add kiya
  },
  {
    name: "❤️ Love",
    description: "Books about love, romance, and relationships.",
    bg: "bg-pink-600",
    route: "/love", // ✅ route add kiya
  },
  {
    name: "😳 Emotional",
    description: "Books that touch your heart and soul.",
    bg: "bg-red-600",
    route: "/emotional", // ✅ route add kiya
  },
  {
    name: "🧘‍♂️ Self-Help",
    description: "Motivational and personal development books.",
    bg: "bg-green-600",
    route: "/self", // ✅ route add kiya
  },
  {
    name: "📚 Everything",
    description: "A mix of all types of books.",
    bg: "bg-blue-600",
  },
];

const Course = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white px-4 py-12">
      {/* Heading */}
      <h1 className="text-5xl font-bold text-center mb-12 flex items-center justify-center gap-3">
        <span role="img" aria-label="books" className="text-6xl">
          📚
        </span>
        Courses
      </h1>

      {/* Category Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => category.route && navigate(category.route)} // ✅ click pe navigate
            className={`rounded-2xl p-6 shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer ${category.bg}`}
          >
            <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
            <p className="text-white/90">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Course;
