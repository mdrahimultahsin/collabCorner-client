import React from "react";

const collaborationData = [
  {
    id: 1,
    title: "React Open Source Project",
    category: "Web Development",
    description: "Looking for contributors to build a UI library in React.",
    link: "/projects/1",
  },
  {
    id: 2,
    title: "AI Chatbot Collaboration",
    category: "AI/ML",
    description: "Need developers and designers for an AI chatbot project.",
    link: "/projects/2",
  },
  {
    id: 3,
    title: "Mobile Game Dev Team",
    category: "Game Development",
    description: "Join a small team to build a Unity-based mobile game.",
    link: "/projects/3",
  },
];

const CollaborationSection = () => {
  return (
    <section className="max-w-7xl mx-auto my-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-base-content">Collaboration Opportunities</h2>
        <p className="text-secondary-content mt-2">
          Explore ongoing projects and join hands with other developers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collaborationData.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="bg-base-100 dark:bg-base-300 p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-base-content">{item.title}</h3>
            <span className="text-sm text-primary mb-2 inline-block">{item.category}</span>
            <p className="text-secondary-content">{item.description}</p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
              Join Project
            </button>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CollaborationSection;
