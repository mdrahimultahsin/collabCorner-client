import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const feedbackOptions = [
  "Spam or misleading",
  "Hateful or abusive",
  "Off-topic or irrelevant",
];

const Comments = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [modalComment, setModalComment] = useState(null);

  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${postId}`);
      return res.data;
    },
  });

  // Report comment mutation
  const reportMutation = useMutation({
    mutationFn: async ({ commentId, feedback }) => {
      return axiosSecure.post("/reports", {
        commentId,
        feedback,
        reportedByEmail: user.email,
      });
    },
    onSuccess: (_, variables) => {
      Swal.fire("Reported!", "Comment reported successfully.", "success");
      
      setSelectedFeedback((prev) => ({
        ...prev,
        [variables.commentId]: "REPORTED",
      }));
    },
    onError: (error) => {
      Swal.fire("Error", error?.response?.data?.message || "Failed to report", "error");
    },
  });

  const handleFeedbackChange = (id, value) => {
    setSelectedFeedback((prev) => ({ ...prev, [id]: value }));
  };

  const handleReport = (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (!feedback) return;
    reportMutation.mutate({ commentId, feedback });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-primary">Comments on Post</h2>

      {comments.length === 0 ? (
        <p>No Comments on that post</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
              <tr>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Comment</th>
                <th className="px-6 py-3">Feedback</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {comments.map((c) => {
                const isLong = c.comments.length > 20;
                const truncated = isLong
                  ? `${c.comments.slice(0, 20)}...`
                  : c.comments;

                const feedbackSelected = selectedFeedback[c._id];
                const isReported = feedbackSelected === "REPORTED";

                return (
                  <tr key={c._id}>
                    <td className="px-6 py-4 text-gray-800">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{truncated}</span>
                      {isLong && (
                        <button
                          onClick={() => setModalComment(c.comments)}
                          className="ml-2 text-blue-500 hover:underline text-sm"
                        >
                          Read More
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="select select-bordered select-sm w-full"
                        onChange={(e) => handleFeedbackChange(c._id, e.target.value)}
                        defaultValue=""
                        disabled={isReported}
                      >
                        <option value="" disabled>
                          Select Feedback
                        </option>
                        {feedbackOptions.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleReport(c._id)}
                        disabled={!feedbackSelected || isReported}
                        className={`btn btn-sm transition duration-200 ${
                          isReported
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        {isReported ? "Reported" : "Report"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalComment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
            <h3 className="text-lg font-bold mb-2">Full Comment</h3>
            <p className="text-gray-700 mb-4">{modalComment}</p>
            <button
              onClick={() => setModalComment(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <button
              onClick={() => setModalComment(null)}
              className="btn btn-sm btn-primary mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
