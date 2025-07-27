import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaUser, FaPlusCircle, FaClipboardList, FaHome, FaBars, FaTimes } from "react-icons/fa";
import Navbar from "../pages/Shared/Navbar/Navbar";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const user = useUserRole();
  console.log(user);
  return (
    <div className="min-h-screen flex flex-col font-urbanist bg-base-100">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar toggle for mobile */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-base-300">
        <button
          onClick={handleSidebarToggle}
          className="text-2xl text-primary focus:outline-none cursor-pointer"
        >
          <FaBars />
        </button>
        <h2 className="text-xl font-semibold text-primary">Dashboard</h2>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 min-h-full w-64 lg:w-80 bg-base-200 p-6 shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:translate-x-0 md:flex flex-col border-r border-base-300`}
        >
          {/* Close button on mobile */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-primary">Dashboard</h2>
            <button
              onClick={closeSidebar}
              className="text-xl text-error focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          {/* Sidebar nav */}
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="/dashboard"
              end
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-base-content hover:bg-primary hover:text-white"
                }`
              }
            >
              <FaHome />
              Home
            </NavLink>
            <NavLink
              to="/dashboard/userProfile"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-base-content hover:bg-primary hover:text-white"
                }`
              }
            >
              <FaUser />
              My Profile
            </NavLink>
            <NavLink
              to="/dashboard/addPost"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-base-content hover:bg-primary hover:text-white"
                }`
              }
            >
              <FaPlusCircle />
              Add Post
            </NavLink>
            <NavLink
              to="/dashboard/myPosts"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-base-content hover:bg-primary hover:text-white"
                }`
              }
            >
              <FaClipboardList />
              My Posts
            </NavLink>
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
