import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {useForm} from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Shared/Spinner/Spinner";
import {toast} from "react-toastify";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminProfile = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const [value, setValue] = useState("");

  const [isPending, setIsPending] = useState(false);
  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats", {
        headers: {
          email: user?.email,
        },
      });
      return res.data;
    },
  });

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);
    await axiosSecure
      .post("/tags", {
        value: value.toLowerCase(),
        label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        email: user.email,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsPending(false);
        setValue("");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsPending(false);
      });
  };

  if (isLoading) return <Spinner />;

  const pieData = [
    {name: "Posts", value: stats.postCount || 0},
    {name: "Comments", value: stats.commentCount || 0},
    {name: "Users", value: stats.userCount || 0},
  ];

  return (
    <div className="space-y-8">
      {/* Admin Info */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <div className="flex items-center gap-6 flex-wrap">
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
          />
          <div>
            <h2 className="text-2xl font-bold text-primary">
              {user?.displayName || "Admin"}
            </h2>
            <p className="text-base-content mb-2">{user?.email}</p>
            <div className="flex gap-6 flex-wrap">
              <span className="badge badge-primary badge-lg">
                Posts: {stats.postCount || 0}
              </span>
              <span className="badge badge-secondary badge-lg">
                Comments: {stats.commentCount || 0}
              </span>
              <span className="badge badge-accent badge-lg">
                Users: {stats.userCount || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          Site Overview
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tag Form */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4 text-primary">Add New Tag</h3>
        <form onSubmit={handleTagSubmit} className="flex items-center gap-2 ">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Tag Name"
            required
            className="input input-bordered flex-1"
          />
          <div className="flex-1">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Tag"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
