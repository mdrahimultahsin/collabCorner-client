import {useEffect, useState} from "react";
import { format } from 'date-fns';
import {useParams} from "react-router";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Shared/Spinner/Spinner";
import {toast} from "react-toastify";

const PostDetails = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const [post, setPost] = useState(null);
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/posts/${id}`).then((res) => {
        setPost(res.data)
        setLoading(false)
    });
  }, [id, axiosInstance]);

  const handleVote = (type) => {
    if (!user) return toast.error("Please login to vote");
    // implement vote API here
    console.log(`${type} vote on post ${id}`);
  };

  if (loading) return <Spinner />;
  if (!post) {
    return <p>Currently don't have any post in that path</p>;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Post Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={post.authorImage}
          alt="Author"
          className="w-12 h-12 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-lg font-semibold">{post.authorName}</h2>
          <p className="text-sm text-gray-500"> {post?.createdAt ? format(new Date(post.createdAt), 'dd MMM yyyy') : ''}</p>
        </div>
      </div>

      {/* Title & Description */}
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-700 text-lg mb-4">{post.description}</p>

      {/* Tag */}
      <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
        #{post.tag?.label || post.tag}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => handleVote("up")}
          className="flex items-center space-x-1 text-green-600 hover:text-green-700"
        >
          <FaThumbsUp />
          <span>{post.upVote || 0}</span>
        </button>
        <button
          onClick={() => handleVote("down")}
          className="flex items-center space-x-1 text-red-600 hover:text-red-700"
        >
          <FaThumbsDown />
          <span>{post.downVote || 0}</span>
        </button>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
          <FaRegCommentDots />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-500 hover:text-black">
          <FaShareAlt />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>
        {user ? (
          <form className="mb-6">
            <textarea
              rows="3"
              className="w-full border rounded-md p-3 focus:outline-none focus:border-blue-500"
              placeholder="Write a comment..."
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-600">
            Please{" "}
            <span className="text-blue-500 underline cursor-pointer">
              login
            </span>{" "}
            to comment.
          </p>
        )}

        {/* Replace with map of comments */}
        <p className="text-gray-500 italic">No comments yet.</p>
      </div>
    </div>
  );
};

export default PostDetails;
