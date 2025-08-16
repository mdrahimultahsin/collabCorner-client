import React from "react";
import { FaLightbulb, FaRocket, FaUsers } from "react-icons/fa";

const WhyUsSection = () => {
  return (
     <div className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-base-content mb-4">
          Why Join CollabCorner?
        </h2>
        <p className="text-secondary-content mb-12">
          Connect, collaborate, and grow with like-minded developers and creators.
          Explore opportunities, share knowledge, and build amazing projects together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-base-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaUsers className="text-primary text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-base-content">Collaborate</h3>
            <p className="text-secondary-content">
              Join exciting projects and collaborate with talented individuals across the globe.
            </p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaLightbulb className="text-primary text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-base-content">Learn</h3>
            <p className="text-secondary-content">
              Enhance your skills by learning from peers and sharing your knowledge.
            </p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <FaRocket className="text-primary text-4xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-base-content">Grow</h3>
            <p className="text-secondary-content">
              Build your network, gain recognition, and grow as a professional in a collaborative environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;
