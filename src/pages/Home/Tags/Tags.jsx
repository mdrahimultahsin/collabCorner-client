import React from "react";
import { useNavigate } from "react-router";

const tags = [
  {
    name: "React",
    count: 1234,
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  {
    name: "JavaScript",
    count: 2156,
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  },
  {
    name: "Python",
    count: 1876,
    color: "bg-green-100 text-green-700 hover:bg-green-200",
  },
  {
    name: "Node.js",
    count: 987,
    color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  },
  {
    name: "TypeScript",
    count: 1543,
    color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
  },
  {
    name: "Career",
    count: 2341,
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  },
  {
    name: "Remote Work",
    count: 1654,
    color: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  },
  {
    name: "DevOps",
    count: 876,
    color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  },
  {
    name: "AI/ML",
    count: 1432,
    color: "bg-red-100 text-red-700 hover:bg-red-200",
  },
  {
    name: "Web3",
    count: 654,
    color: "bg-violet-100 text-violet-700 hover:bg-violet-200",
  },
];

const Tags = () => {
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    // Navigate to filtered posts page or set filter state
    navigate(`/search?tag=${tag}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-4 text-neutral-800">Popular Tags</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => handleTagClick(tag.name)}
            className={`px-4 py-4 rounded-full text-sm md:text-base font-medium transition cursor-pointer ${tag.color}`}
          >
            #{tag.name} <span className="ml-1 text-xs text-secondary-content">({tag.count})</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tags;
