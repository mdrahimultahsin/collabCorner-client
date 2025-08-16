import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const JoinProjectSection = () => {
  const axiosInstance = useAxiosInstance();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);

    const projectData = {
      name,
      email,
      skills,
      createdAt: new Date(),
    };

    try {
      const res = await axiosInstance.post("/projects", projectData);
      if (res.data.insertedId) {
        toast.success("Request to join project submitted!");
        setName("");
        setEmail("");
        setSkills("");
      } else {
        toast.error("Failed to submit request. Try again.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-7xl mx-4 lg:mx-auto my-16 px-4 bg-base-200 p-6 rounded-xl shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-base-content">Join a Project</h2>
        <p className="text-secondary-content mt-2">
          Fill the form below to join a collaboration project and contribute your skills.
        </p>
      </div>

      <form onSubmit={handleJoin} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-base-content"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-base-content"
          required
        />
        <input
          type="text"
          placeholder="Your Skills (optional)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-base-content"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          {loading ? "Submitting..." : "Join Project"}
        </button>
      </form>
    </section>
  );
};

export default JoinProjectSection;
