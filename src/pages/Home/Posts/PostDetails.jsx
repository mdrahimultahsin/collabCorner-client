import {format} from "date-fns";
import {useParams} from "react-router";
import {FaThumbsUp, FaThumbsDown, FaRegCommentDots} from "react-icons/fa";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Shared/Spinner/Spinner";
import {toast} from "react-toastify";
import {FacebookIcon, FacebookShareButton} from "react-share";

import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CommentCard from "./CommentCard";

const PostDetails = () => {
  const {id} = useParams();
  const {user} = useAuth();
  const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();
  const shareUrl = `https://collabcorner-forum.web.app/post/${id}`;
  const title = "Check out this awesome page!";
  
  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    data: comments = [],
    refetch: refetchComments,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments/${id}`);
      return res.data.comments;
    },
    enabled: !!id,
  });
  console.log(comments);
  const handleVote = async (type) => {
    if (!user) return toast.error("Please login to vote");

    await axiosSecure
      .patch(`/vote/${id}`, {
        type,
        email: user.email,
        votedBy: {voterEmail: user.email, type: type},
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(`${type} successfully`);
          refetch();
        }
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          toast.info(err.response.data.message);
        } else {
          toast.error("Failed to vote. Try again later.");
        }
      });
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("Please login to comment");
    }
    const comments = e.target.comments.value;
    if (comments.length === 0) {
      toast.error("Comment cannot be empty");
      return;
    }
    const commentsData = {
      comments,
      postId: id,
      commentAt: new Date(),
      name: user.displayName,
      photo: user?.photoURL,
      email: user?.email,
    };
    try {
      await axiosSecure.post("/comments", commentsData).then(async (res) => {
        if (res.data.insertedId) {
          await axiosInstance
            .patch(`/comments/${id}/count`)
            .then((res) => {
              if (res.data.acknowledged) {
                toast.success("Comment Added");
              }
            })
            .catch(() => {});
          refetchComments();
          e.target.reset();
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (isLoading) return <Spinner />;
  if (isError) return <p>Failed to load post data.</p>;
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
          <p className="text-sm text-gray-500">
            {" "}
            {post?.createdAt
              ? format(new Date(post.createdAt), "dd MMM yyyy")
              : ""}
          </p>
        </div>
      </div>

      {/* Title & Description */}
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-700 text-lg mb-4">{post.description}</p>

      {/* Tag */}
      <div className="flex gap-4 flex-wrap">
        {post.tags?.map((tag, i) => {
          return (
            <div
              key={i}
              className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4 hover:underline cursor-default"
            >
              #{tag}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-8">
        {/* Upvote Button */}
        <button
          onClick={() => handleVote("upvote")}
          className={`flex items-center space-x-1 border px-2 py-1 rounded transition duration-200 cursor-pointer ${
            post?.votedBy?.some(
              (v) => v.email === user?.email && v.type === "upvote"
            )
              ? "bg-green-100 text-green-700 border-green-500"
              : "text-gray-600 hover:text-green-700 border-gray-300 hover:border-green-400"
          }`}
        >
          <FaThumbsUp />
          <span>{post.upVote || 0}</span>
        </button>

        {/* Downvote Button */}
        <button
          onClick={() => handleVote("downvote")}
          className={`flex items-center space-x-1 border px-2 py-1 rounded transition duration-200 cursor-pointer ${
            post?.votedBy?.some(
              (v) => v.email === user?.email && v.type === "downvote"
            )
              ? "bg-red-100 text-red-700 border-red-500"
              : "text-gray-600 hover:text-red-700 border-gray-300 hover:border-red-400"
          }`}
        >
          <FaThumbsDown />
          <span>{post.downVote || 0}</span>
        </button>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
          <FaRegCommentDots />
          <span>{comments?.length}</span>
        </button>

        {user ? (
          <FacebookShareButton
            className="flex gap-2 items-center text-gray-500 hover:text-black"
            url={shareUrl}
            quote={title || "Check out this awesome page!"}
          >
            <FacebookIcon size={30} round />
            <span className="text-gray-700 font-medium text-sm">Share</span>
          </FacebookShareButton>
        ) : (
          <button
            onClick={() => toast.error("Please login to share this post")}
            className="flex gap-2 items-center text-gray-500 hover:text-black cursor-pointer"
          >
            <FacebookIcon size={30} round />
            <span className="text-gray-700 font-medium text-sm">Share</span>
          </button>
        )}
      </div>

      {/* Comment Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>
        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <textarea
              rows="3"
              name="comments"
              className="w-full border-border-color border rounded-md p-3 focus:outline-none focus:borzer-blue-500"
              placeholder="Write a comment..."
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-primary text-white cursor-pointer rounded "
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

        <div className="space-y-4 mt-6">
          {commentsLoading ? (
            <Spinner />
          ) : comments?.length === 0 ? (
            <p className="text-gray-500 italic">No comments yet.</p>
          ) : (
            comments?.map((comment) => (
              <CommentCard comment={comment} key={comment._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
