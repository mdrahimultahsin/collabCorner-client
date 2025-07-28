import React from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {toast} from "react-toastify";
import useAuth from "../../../hooks/useAuth";
const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const {mutate, isPending} = useMutation({
    mutationFn: async (announcementData) => {
      const res = await axiosSecure.post("/announcements", announcementData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        toast.success("Announcement posted successfully!");
        reset();
      }
    },
    onError: () => {
      toast.error("Failed to post announcement");
    },
  });

  const onSubmit = (data) => {
    const announcement = {
      title: data.title,
      description: data.description,
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorImage: user?.photoURL,
      date: new Date(),
    };
    mutate(announcement);
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        📢 Make an Announcement
      </h2>

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.photoURL}
          alt="Author"
          className="w-14 h-14 rounded-full border shadow-sm"
        />
        <div>
          <h3 className="text-lg font-semibold">{user?.displayName}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Announcement Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", {required: "Title is required"})}
            placeholder="Enter announcement title"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-primary"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={6}
            {...register("description", {required: "Description is required"})}
            placeholder="Write the announcement details..."
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-primary"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full text-white font-semibold py-2 rounded-md transition cursor-pointer ${
            isPending ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isPending ? "Posting..." : "Post Announcement"}
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
