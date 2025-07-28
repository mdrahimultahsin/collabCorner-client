import React, {useState} from "react";
import {NavLink, Outlet} from "react-router";
import {
  FaUser,
  FaPlusCircle,
  FaClipboardList,
  FaHome,
  FaBars,
  FaTimes,
  FaBullhorn,
  FaUsers,
  FaFlag,
} from "react-icons/fa";
import Navbar from "../pages/Shared/Navbar/Navbar";
import useUserRole from "../hooks/useUserRole";
import Spinner from "../pages/Shared/Spinner/Spinner";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {role,roleLoading} = useUserRole();

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (roleLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex flex-col font-urbanist bg-base-100">
      <Navbar />

      {/* Mobile Sidebar Toggle */}
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
          <div className="md:hidden flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-primary">Dashboard</h2>
            <button
              onClick={closeSidebar}
              className="text-xl text-error focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            
           
            {role === "admin" ? (
              <NavLink
                to="/dashboard/adminProfile"
                onClick={closeSidebar}
                className={({isActive}) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-base-content hover:bg-primary hover:text-white"
                  }`
                }
              >
                <FaUser />
                Admin Profile
              </NavLink>
            ) : (
              <NavLink
                to="/dashboard/userProfile"
                onClick={closeSidebar}
                className={({isActive}) =>
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
            )}
            <NavLink
              to="/dashboard/addPost"
              onClick={closeSidebar}
              className={({isActive}) =>
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
              className={({isActive}) =>
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

            {/* Admin-Only Routes */}
            {role === "admin" && (
              <>
                <NavLink
                  to="/dashboard/manageUsers"
                  onClick={closeSidebar}
                  className={({isActive}) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-base-content hover:bg-primary hover:text-white"
                    }`
                  }
                >
                  <FaUsers />
                  Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/reportedComments"
                  onClick={closeSidebar}
                  className={({isActive}) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-base-content hover:bg-primary hover:text-white"
                    }`
                  }
                >
                  <FaFlag />
                  Reported Activities
                </NavLink>
                <NavLink
                  to="/dashboard/announcement"
                  onClick={closeSidebar}
                  className={({isActive}) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-base-content hover:bg-primary hover:text-white"
                    }`
                  }
                >
                  <FaBullhorn />
                  Make Announcement
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-30 lg:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main Outlet */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
