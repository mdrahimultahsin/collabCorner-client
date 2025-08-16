import {useQuery} from "@tanstack/react-query";
import React, {useState} from "react";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Spinner from "../../Shared/Spinner/Spinner";
import Select from "react-select";
const sortOptions = [
  {value: "recent", label: "Most Recent"},
  {value: "popularity", label: "Most Popular"},
];

const AllPosts = () => {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const limit = 5;

  const axiosInstance = useAxiosInstance();

  const queryKey = ["posts", {search, tag, sortBy, page}];
  const {data = {}, isLoading} = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());
      if (tag) params.append("tag", tag);
      params.append("sort", sortBy);
      params.append("page", page);
      params.append("limit", limit);

      const res = await axiosInstance.get(`/posts?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = data.totalPages || 1;
const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popularity", label: "Most Popular" },
];
  return (
    <div className="max-w-7xl mx-auto my-10 bg-base-300 py-10 p-4 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">All Posts</h1>
        <p className="text-secondary-content mt-2">
          Explore the latest posts, search by tags, and sort by popularity or
          newest.
        </p>
      </div>
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by tags"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-base-content"
        />
        <button
          onClick={() => setPage(1)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Search
        </button>

        {/* Sort Dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            value={sortOptions.find((opt) => opt.value === sortBy)}
            onChange={(selected) => setSortBy(selected.value)}
            options={sortOptions}
            placeholder="Sort by..."
            classNamePrefix="react-select"
            className="text-base-content"
          />
        </div>
      </div>

      {/* Posts */}
      {isLoading ? (
        <Spinner />
      ) : data.posts?.length === 0 ? (
        <p className="text-secondary-content italic">No posts found.</p>
      ) : (
        <div className="space-y-4">
          {data.posts.map((post) => (
            <div
              key={post._id}
              className="bg-base-100 dark:bg-base-300 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg text-base-content">{post.title}</h2>
                <p className="text-sm text-secondary-content">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-secondary-content mb-2">{post.description}</p>
              <div className="flex gap-2 flex-wrap">
                {post.tags?.map((t) => (
                  <span
                    key={t}
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm cursor-pointer"
                    onClick={() => {
                      setTag(t);
                      setPage(1);
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
