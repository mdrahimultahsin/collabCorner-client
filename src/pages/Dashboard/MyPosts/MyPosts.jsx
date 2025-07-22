import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

import {FaComments, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner/Spinner";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import Swal from "sweetalert2";

const MyPosts = () => {
  const {user,loading} = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
const navigate = useNavigate()
  // Load all posts by current user
  const {data: myPosts = [], isLoading} = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPosts?email=${user?.email}`);
      return res.data;
    },
    enabled: !loading && !!user?.email, 
  });

  // Delete mutation
  const {mutateAsync: deletePost} = useMutation({
    mutationFn: async (postId) => {
      const res = await axiosSecure.delete(`/posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myPosts", user?.email]);
      toast.success("Post deleted successfully");
    },
  });

  const handleDelete = async (id) => {
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
    await deletePost(id);
    Swal.fire("Deleted!", "Your post has been deleted.", "success");
  }
};

  const handleComment = (postId) => {
    toast.info(`Comment clicked for Post ID: ${postId}`);
    // You can navigate to the comment page or open modal
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      {myPosts.length === 0 ? (
        <>
          <p>You have not created any posts yet.</p>
          <button onClick={()=>navigate("/dashboard/addPost")} className="btn btn-primary mt-3">Create a Post</button>
        </>
      ) : (
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
            <tbody>
              {myPosts.map((post) => (
                <tr key={post._id} className="border-b hover:bg-base-100">
                  <td className="p-3">{post.title}</td>
                  <td className="p-3">{post.createdAt?format(new Date(post.createdAt), 'dd MMM yyyy'):""}</td>
                  <td className="p-3 text-center">
                    {post.upVote || 0}↑ / {post.downVote || 0}↓
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleComment(post._id)}
                      className="btn btn-sm text-white btn-accent hover:text-white "
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
      )}
    </div>
  );
};

export default MyPosts;
