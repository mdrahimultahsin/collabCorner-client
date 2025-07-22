import React, {useState} from "react";
import {FaBell, FaChevronDown, FaUser, FaBars, FaTimes} from "react-icons/fa";
import CollabCornerLogo from "../CollabCornerLogo/CollabCornerLogo";
import {Link, NavLink} from "react-router";
import useAuth from "../../../hooks/useAuth";
import {toast} from "react-toastify";
import errorImg from "../../../assets/profile.png";

const Navbar = () => {
  const {user, logOutUser} = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border-color shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
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
                  : "text-gray-700 font-medium hover:text-hover-color transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/membership"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={({isActive}) =>
                isActive
                  ? "text-hover-color font-semibold border-b-2 border-hover-color"
                  : "text-gray-700 font-medium hover:text-hover-color transition"
              }
            >
              Membership
            </NavLink>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Notification */}
            <div className="relative cursor-pointer">
              <FaBell className="text-gray-600 text-lg hover:text-hover-color" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border border-white">
                3
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
                  <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b">
                      {user.displayName || "Guest"}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
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
              className="lg:hidden text-gray-600 cursor-pointer"
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
              className="block py-2 text-gray-700 hover:text-hover-color"
            >
              Home
            </NavLink>
            <NavLink
              to="/membership"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block py-2 text-gray-700 hover:text-hover-color"
            >
              Membership
            </NavLink>

            {user ? (
              <NavLink
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block py-2 text-gray-700 hover:text-hover-color"
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
