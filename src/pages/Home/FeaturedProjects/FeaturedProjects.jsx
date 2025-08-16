import React from "react";
import { FaReact, FaNodeJs, FaDatabase, FaMobileAlt } from "react-icons/fa";
import { SiFirebase, SiMongodb, SiJavascript } from "react-icons/si";
import { useNavigate } from "react-router";

const featuredProjects = [
  {
    id: 1,
    title: "Collab Web Platform",
    description: "A platform to collaborate on web projects with real-time chat.",
    tags: ["React", "Node", "Firebase"],
    icon: <FaReact className="text-blue-500 w-8 h-8" />,
  },
  {
    id: 2,
    title: "AI Research Project",
    description: "Collaborate on cutting-edge AI models and data experiments.",
    tags: ["Python", "ML", "MongoDB"],
    icon: <FaDatabase className="text-green-500 w-8 h-8" />,
  },
  {
    id: 3,
    title: "Mobile App Dev",
    description: "Build and share innovative mobile applications together.",
    tags: ["React Native", "Node", "Firebase"],
    icon: <FaMobileAlt className="text-purple-500 w-8 h-8" />,
  },
  {
    id: 4,
    title: "Open Source Contribution",
    description: "Contribute to open-source projects and learn collaboratively.",
    tags: ["JavaScript", "GitHub", "Node"],
    icon: <SiJavascript className="text-yellow-500 w-8 h-8" />,
  },
];

const FeaturedProjects = () => {
        const navigate = useNavigate()
  return (
    <section className="max-w-7xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-base-content">Featured Projects</h2>
        <p className="text-secondary-content mt-2">
          Explore some of the most exciting collaborations happening right now.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-base-100 dark:bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="mb-4">{project.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-base-content">{project.title}</h3>
            <p className="text-secondary-content mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button onClick={()=>navigate("/allPosts")} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
              View Project
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
