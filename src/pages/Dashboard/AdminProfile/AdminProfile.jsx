import React from "react";
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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminProfile = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {register, handleSubmit, reset} = useForm();

  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    if (!data?.name?.trim()) return;

    try {
      await axiosSecure.post("/tags", {name: data.name});
      reset();
      refetch();
    } catch (err) {
      console.error("Tag add failed", err);
    }
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            {...register("name", {required: true})}
            type="text"
            placeholder="Enter tag name"
            className="input input-bordered w-full sm:w-1/2"
          />
          <button type="submit" className="btn btn-primary">
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
