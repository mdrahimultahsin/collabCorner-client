import React, { useRef, useState } from "react";
import Banner from "./Banner/Banner";
import Tags from "./Tags/Tags";
import Posts from "./Posts/Posts";
import Announcement from "./Announcements/Annoucements";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const limit = 5;

  const postsRef = useRef();
  const axiosInstance = useAxiosInstance();

  const queryKey = ["posts", { search, tag, sortBy, page }];

  const { data = {}, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());
      if (tag) params.append("tag", tag);
      if (sortBy === "popularity") params.append("sort", "popularity");
      else if (sortBy === "recent") params.append("sort", "recent");
      
      params.append("page", page);
      params.append("limit", limit);
      console.log(params);

      const res = await axiosInstance.get(`/posts?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const posts = data.posts || [];
  const totalCount = data.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setTag("");
    setPage(1);
    if (posts.length > 0 && postsRef.current) {
      postsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTagClick = (clickedTag) => {
    setTag(clickedTag);
    setSearch("");
    setPage(1);
    if (posts.length > 0 && postsRef.current) {
      postsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div >
      {/* Banner */}
      <section>
        <Banner search={search} setSearch={setSearch} handleSearch={handleSearch} />
      </section>

      <section className="px-4 md:px-2 lg:px-0 md:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {/* Posts */}
        <div className="md:col-span-2 shadow rounded-lg bg-white order-2 md:order-1">
          <Posts
            postsRef={postsRef}
            posts={posts}
            search={search}
            tag={tag}
            setTag={setTag}
            setSearch={setSearch}
            isLoading={isLoading}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 pb-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn btn-sm"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setPage(i + 1);
                  if (postsRef.current) {
                    postsRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`btn btn-sm ${
                  page === i + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="btn btn-sm"
            >
              Next
            </button>
          </div>
        </div>

        
        <div className="md:col-span-1 shadow rounded-lg bg-white order-1 md:order-2">
          <Tags handleTagClick={handleTagClick} selectedTag={tag} />
          <Announcement />
        </div>
      </section>
    </div>
  );
};

export default Home;
