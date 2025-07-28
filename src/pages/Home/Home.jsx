import React, {useState} from "react";
import Banner from "./Banner/Banner";
import Tags from "./Tags/Tags";
import Posts from "./Posts/Posts";
import Announcement from "./Announcements/Annoucements";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import {useQuery} from "@tanstack/react-query";

const Home = () => {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const axiosInstance = useAxiosInstance();

  // Combined query key with all filters
  const queryKey = ["posts", {search, tag, sortBy}];

  const {
    data: posts = [],
    isLoading,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();

      if (search.trim()) params.append("search", search.trim());
      if (tag) params.append("tag", tag);
      if (sortBy === "popularity") params.append("sort", "popularity");
      else if (sortBy === "recent") params.append("sort", "recent"); 

      const res = await axiosInstance.get(`/posts?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
  e.preventDefault();
  if (!search.trim()) return;
   setTag(""); 
 
};

  const handleTagClick = (clickedTag) => {
    setTag(clickedTag);
    setSearch(""); 
  };

  return (
    <div className="bg-base-200">
      {/* Banner */}
      <section>
        <Banner
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
      </section>

      <section className="px-4 md:px-2 lg:px-0 md:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {/* Posts */}
        <div className="md:col-span-2 shadow rounded-lg bg-white order-2 md:order-1">
          <Posts
            posts={posts}
            isLoading={isLoading}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Sidebar: Tags & Announcements */}
        <div className="md:col-span-1 shadow rounded-lg bg-white order-1 md:order-2">
          <Tags handleTagClick={handleTagClick} selectedTag={tag} />
          <Announcement />
        </div>
      </section>
    </div>
  );
};

export default Home;
