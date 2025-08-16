import React, {useState} from "react";
import {FaBell, FaChevronDown, FaUser, FaBars, FaTimes} from "react-icons/fa";
import {RiDashboardLine} from "react-icons/ri";
import CollabCornerLogo from "../CollabCornerLogo/CollabCornerLogo";
import {Link, NavLink} from "react-router";
import useAuth from "../../../hooks/useAuth";
import {toast} from "react-toastify";
import errorImg from "../../../assets/profile.png";
import {useQuery} from "@tanstack/react-query";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import {FaGear} from "react-icons/fa6";

const Navbar = () => {
  const {user, logOutUser} = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const axiosInstance = useAxiosInstance();
  const {data: annoucementCount} = useQuery({
    queryKey: ["announcementCount"],
    queryFn: async () => {
      const res = await axiosInstance.get("/announcements/count");
      return res.data;
    },
  });
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-neutral-content shadow-sm 
     bg-base-100/70 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <CollabCornerLogo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={({isActive}) =>
                isActive
                  ? "text-hover-color font-semibold border-b-2 border-hover-color"
                  : "text-base-content font-medium hover:text-hover-color transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allPosts"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={({isActive}) =>
                isActive
                  ? "text-hover-color font-semibold border-b-2 border-hover-color"
                  : "text-base-content font-medium hover:text-hover-color transition"
              }
            >
              All Posts
            </NavLink>
            <NavLink
              to="/membership"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={({isActive}) =>
                isActive
                  ? "text-hover-color font-semibold border-b-2 border-hover-color"
                  : "text-base-content font-medium hover:text-hover-color transition"
              }
            >
              Membership
            </NavLink>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Notification */}

            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="dark"
              />

              {/* sun icon */}
              <svg
                className="swap-off h-7 w-7 fill-current text-base-content"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-7 w-7 fill-current text-base-content"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div className="relative cursor-pointer">
              <FaBell className="text-base-content text-lg hover:text-hover-color" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border border-white">
                {annoucementCount?.count || 0}
              </span>
            </div>

            {/* Profile Dropdown */}
            {user ? (
              <div
                className="relative flex items-center space-x-2 cursor-pointer hover:text-hover-color"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-10 h-10 ring-2 ring-hover-color rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = errorImg;
                    }}
                    alt="Profile"
                    src={user.photoURL || errorImg}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-12 right-0 w-48 bg-base-100 shadow-lg rounded-lg border border-neutral-content py-2 z-50">
                    <div className="px-4 py-2 text-sm text-base-content font-semibold border-b">
                      {user.displayName || "Guest"}
                    </div>

                    <Link
                      to="/dashboard"
                      className=" px-4 py-2 text-sm text-base-content hover:bg-base-200 flex items-center gap-2"
                    >
                      <RiDashboardLine size={20} /> Dashboard
                    </Link>
                    <Link
                      to="/setting"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-base-content hover:bg-base-200"
                    >
                      <FaGear size={20} /> Setting
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/joinUs"
                className="hidden lg:inline-block bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-hover-color transition"
              >
                Join Us
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-base-content cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 pb-4 border-t border-gray-200">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block py-2 text-base-content hover:text-hover-color"
            >
              Home
            </NavLink>
            <NavLink
              to="/allPosts"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block py-2 text-base-content hover:text-hover-color"
            >
              All Posts
            </NavLink>
            <NavLink
              to="/membership"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block py-2 text-base-content hover:text-hover-color"
            >
              Membership
            </NavLink>

            {user ? (
              <NavLink
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="block py-2 text-base-content hover:text-hover-color"
              >
                Dashboard
              </NavLink>
            ) : (
              <Link
                to="/joinUs"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn btn-primary text-white block py-2 font-medium my-2"
              >
                Join Us
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
