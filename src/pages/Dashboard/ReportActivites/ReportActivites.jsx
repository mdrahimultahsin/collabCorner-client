import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner/Spinner";

const ReportActivities = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/reports", {
          headers: {
            email: user?.email,
          },
        });
        setReports(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [axiosSecure, user?.email]);

  const handleAction = async (reportId, actionType) => {
    try {
      await axiosSecure.patch(
        `/reports/${reportId}/action`,
        {
          action: actionType,
        },
        {
          headers: {
            email: user.email,
          },
        }
      );

      Swal.fire(
        "Success",
        `Report marked as ${
          actionType.charAt(0).toUpperCase() + actionType.slice(1)
        }`,
        "success"
      );

      // Update UI locally
      setReports((prev) =>
        prev.map((r) => (r._id === reportId ? {...r, status: actionType} : r))
      );
    } catch {
      Swal.fire("Error", "Failed to perform action", "error");
    }
  };

  if (loading) return <Spinner />;

  if (reports.length === 0)
    return <div className="p-4">No reported activities found.</div>;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-primary">
        Reported Activities
      </h1>
      <div className="overflow-x-auto border border-border-color rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
            <tr>
              <th className="px-6 py-3">Commenter Email</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Feedback</th>
              <th className="px-6 py-3">Reported At</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Admin Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="px-6 py-4">
                  {report.commenterEmail || "Unknown"}
                </td>
                <td
                  className="px-6 py-4 max-w-xs truncate"
                  title={report.commentText}
                >
                  {report.commentText}
                </td>
                <td className="px-6 py-4">{report.feedback}</td>
                <td className="px-6 py-4">
                  {new Date(report.reportedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 capitalize">{report.status}</td>

                <td className="px-6 py-4 text-center">
                  <select
                    className="select select-sm select-bordered w-full max-w-xs
       bg-white border border-gray-300 rounded-md
       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
       cursor-pointer"
                    defaultValue=""
                    onChange={async (e) => {
                      const action = e.target.value;
                      if (!action) return;

                      if (action === "delete") {
                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "⚠️ This will permanently delete the comment!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        });

                        if (!result.isConfirmed) {
                          e.target.value = "";
                          return;
                        }
                      }

                      await handleAction(report._id, action);
                      e.target.value = "";
                    }}
                  >
                    <option value="" disabled>
                      Select action
                    </option>
                    <option value="reviewed">✅ Mark Reviewed</option>
                    <option value="dismissed">🚫 Dismiss</option>
                    <option value="delete">🗑️ Delete Comment</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportActivities;
