import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import Spinner from "../../Shared/Spinner/Spinner";
import {  FaTags } from "react-icons/fa";
const Tags = ({setPosts}) => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/tags")
      .then((res) => {
        setTags(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, [axiosInstance]);

  const colorClasses = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
    "bg-teal-100 text-teal-700",
  ];
  const handleTagClick = async (tag) => {
    await axiosInstance
      .get(`/posts?tag=${tag}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <section className="w-full px-4 py-5">
      <h2 className="text-xl font-black mb-4 text-primary font-urbanist flex items-center gap-2">
        <FaTags className="text-primary" />Popular Tags
      </h2>
      <div className="flex flex-wrap gap-3">
        {tags?.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag.value)}
            className={`px-4 py-4 rounded-full text-sm md:text-base font-medium transition cursor-pointer btn-xs btn ${
              colorClasses[index % colorClasses.length]
            } hover:underline`}
          >
            #{tag.label}{" "}
            <span className="ml-1 text-xs text-secondary-content">
              ({tag.count})
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tags;
