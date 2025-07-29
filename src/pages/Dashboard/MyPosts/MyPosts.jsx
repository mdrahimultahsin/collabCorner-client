import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaComments, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner/Spinner";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useState } from "react";

const MyPosts = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  // Load paginated posts
  const { data = {}, isLoading } = useQuery({
    queryKey: ["myPosts", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPosts?email=${user?.email}&page=${page}&limit=${limit}`);
      return res.data;
    },
    enabled: !loading && !!user?.email,
  });

  const posts = data.posts || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Mutation to decrement tag counts
  const decrementTagCounts = async (tags) => {
    return axiosSecure.patch("/tags/decrement", { tags });
  };

  const { mutateAsync: decrementTagsMutate } = useMutation({
    mutationFn: decrementTagCounts,
    onError: (error) => {
      console.error("Failed to decrement tag counts:", error);
      toast.error("Failed to update tag counts");
    },
  });

  // Delete mutation
  const { mutateAsync: deletePost } = useMutation({
    mutationFn: async (postId) => {
      const res = await axiosSecure.delete(`/posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts", user?.email, page]);
      toast.success("Post deleted successfully");
    },
  });

  const handleDelete = async (id) => {
    const postToDelete = posts.find((p) => p._id === id);
    if (!postToDelete) {
      toast.error("Post not found");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deletePost(id);

        // Decrement tag counts after successful post deletion
        if (postToDelete.tags && postToDelete.tags.length > 0) {
          await decrementTagsMutate(postToDelete.tags);
        }

        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      } catch (error) {
        toast.error(error?.message || "Failed to delete post");
      }
    }
  };

  const handleComment = (postId) => {
    navigate(`/comments/${postId}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      {posts.length === 0 ? (
        <>
          <p>You have not created any posts yet.</p>
          <button onClick={() => navigate("/dashboard/addPost")} className="btn btn-primary mt-3">
            Create a Post
          </button>
        </>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Created At</th>
                  <th className="p-3 text-center">Votes</th>
                  <th className="p-3 text-center">Comment</th>
                  <th className="p-3 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="border border-border-color">
                {posts.map((post) => (
                  <tr key={post._id} className="border-b border-border-color hover:bg-base-100">
                    <td className="p-3">{post.title}</td>
                    <td className="p-3">
                      {post.createdAt ? format(new Date(post.createdAt), "dd MMM yyyy") : ""}
                    </td>
                    <td className="p-3 text-center">
                      {post.upVote || 0}↑ / {post.downVote || 0}↓
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleComment(post._id)}
                        className="btn btn-sm text-white btn-accent hover:text-white"
                      >
                        <FaComments className="mr-1" /> Comment
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="btn btn-sm btn-outline btn-error hover:text-white"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded bg-white hover:bg-primary hover:text-white cursor-pointer"
            >
              Prev
            </button>

            {[...Array(totalPages || 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 border rounded ${
                  page === idx + 1 ? "bg-primary text-white" : "bg-white"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded bg-white hover:bg-primary hover:text-white cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPosts;
