import React from "react";
import {useQuery} from "@tanstack/react-query";
import {FaBullhorn} from "react-icons/fa";
import {formatDistanceToNow} from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner/Spinner";

const Announcement = () => {
  const axiosSecure = useAxiosSecure();

  const {data: announcements = [], isLoading} = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <section className="px-4 py-5">
      <h2 className="text-2xl flex items-center gap-2 mb-6 text-primary font-black font-urbanist">
        <FaBullhorn /> Announcements
      </h2>

      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={announcement.authorImage}
                alt={announcement.authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold  text-gray-800">
                  {announcement.authorName}
                </h4>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(announcement.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {announcement.title}
            </h3>
            <p className="text-gray-700 mt-1">{announcement.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcement;
