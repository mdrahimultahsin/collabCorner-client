import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const NewsletterSection = () => {
  const axiosInstance = useAxiosInstance();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/newsletter", { email });
      if (res.data.insertedId) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error("Subscription failed. Try again.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <section className="bg-primary text-white py-12 px-4 rounded-xl my-10 max-w-7xl mx-4 lg:mx-auto shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="mt-2 text-white/80">
          Stay updated with the latest collaboration opportunities and news.
        </p>
      </div>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row gap-4 justify-center items-center"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-2/3 p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-white text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-white/90 transition w-full md:w-auto"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </section>
  );
};

export default NewsletterSection;
