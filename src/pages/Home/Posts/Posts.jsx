import { FiTrendingUp, FiXCircle } from "react-icons/fi";
import Select from "react-select";

import Spinner from "../../Shared/Spinner/Spinner";
import PostCard from "./PostCard";

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popularity", label: "Sort by Popularity" },
];

const Posts = ({
  sortBy,
  setSortBy,
  posts,
  isLoading,
  postsRef,
  setSearch,
  setTag,
  search,
  tag,
}) => {
  const handleClearFilters = () => {
    setSearch("");
    setTag("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10" ref={postsRef}>
      {/* Header and controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        {/* Title and description */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 font-urbanist">
            💬 Latest Discussions
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Discover trending topics and join the conversation
          </p>
        </div>

        {/* Filters and sort */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Sort Option */}
          <div className="flex items-center gap-2">
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
      </div>

      {/* Posts List */}
      {(tag || search) && (
  <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-700">
    {tag && (
      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
        Tag: {tag}
      </span>
    )}
    {search && (
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
        Search: {search}
      </span>
    )}
    <button
      onClick={handleClearFilters}
      className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition cursor-pointer"
    >
      <FiXCircle className="w-4 h-4" />
      Clear All Filters
    </button>
  </div>
)}
      <div>
        {isLoading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-gray-500 flex flex-col items-center gap-2">
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008H14.25V9.75zm-6.364 6.364a7.5 7.5 0 1110.607 0m-10.607 0a7.5 7.5 0 0010.607 0"
              />
            </svg>
            <p className="text-lg font-semibold">No posts found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters or sort type.</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Posts;
