import React, {useState} from "react";
import {FiTrendingUp} from "react-icons/fi";
import Select from "react-select";
import {useQuery} from "@tanstack/react-query";

import Spinner from "../../Shared/Spinner/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PostCard from "./PostCard";
const sortOptions = [
  {value: "popularity", label: "Sort by Popularity"},
  {value: "recent", label: "Most Recent"},
  {value: "comments", label: "Most Comments"},
  {value: "votes", label: "Highest Voted"},
];
const Posts = () => {
  const [sortBy, setSortBy] = useState("popularity");
  const axiosInstance = useAxiosSecure()
  const {data: posts = [], isLoading} = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts`);
      return res.data;
    },
  });
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        {/* Left side */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Latest Discussions
          </h1>
          <p className="text-gray-600 mt-1">
            Discover trending topics and join the conversation
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <FiTrendingUp className="w-5 h-5 text-blue-600" />
          <div className="w-52">
            <Select
              value={sortOptions.find((option) => option.value === sortBy)}
              onChange={(selected) => setSortBy(selected.value)}
              options={sortOptions}
              classNamePrefix="react-select"
              placeholder="Sort by..."
            />
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <p className="text-gray-600">You haven’t posted anything yet.</p>
        ) : (
          posts?.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Posts;
