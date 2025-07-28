import React, {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {FaCheckCircle, FaMedal} from "react-icons/fa";
import Swal from "sweetalert2";
import Spinner from "../../Shared/Spinner/Spinner";

const ManageUsers = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?email=${user.email}&search=${searchText}`
      );
      return res.data;
    },
    enabled: !!searchText,
  });

  const handleMakeAdmin = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to promote this user to admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/users/make-admin/${userId}`,
          {},
          {
            headers: {
              email: user?.email,
            },
          }
        );
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "User promoted to admin",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: "top-right",
          });
          refetch();
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message || "Failed to make admin",
          toast: true,
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by username..."
        className="border px-3 py-2 mb-4 rounded w-full max-w-md"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Table */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-center">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Membership</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.role === "admin" ? (
                      <span className="text-green-600 font-semibold">
                        Admin
                      </span>
                    ) : (
                      <span className="text-gray-500">User</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.badges === "gold" ? (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <FaMedal className="text-xl" />
                        <span className="font-medium">Gold</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <FaMedal className="text-xl" />
                        <span className="font-medium">Bronze</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.role !== "admin" ? (
                      <button
                        className="bg-primary hover:bg-primary cursor-pointer text-white text-xs px-3 py-1 rounded transition"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 bg-success text-white text-xs font-semibold px-3 py-1 rounded-full"
                        title="This user is already an admin"
                      >
                        <FaCheckCircle /> Admin
                      </span>
                    )}
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

export default ManageUsers;
