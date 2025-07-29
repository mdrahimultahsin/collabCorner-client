import React from "react";
import {Link} from "react-router";
import {FaFacebookF, FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";
import CollabCornerLogo from "../CollabCornerLogo/CollabCornerLogo";
import useAuth from "../../../hooks/useAuth";

const Footer = () => {
  const {user} = useAuth();
  return (
    <footer className="bg-white shadow border-t border-border-color mt-16 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 grid-cols-1 gap-5">
        {/* Logo and description */}
        <div className="space-y-3">
          <CollabCornerLogo />
          <p className="text-gray-500">
            CollabCorner is a collaborative space to share ideas, discuss
            topics, and build community around social impact and development.
          </p>
          <div className="flex space-x-4 mt-2 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                All Posts
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Tags
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Community Links */}
        <div>
          <h3 className="font-semibold mb-3">Community</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Acknowledgement / Call to Action */}
        <div>
          <h3 className="font-semibold mb-3">Join the Movement</h3>
          <p className="text-gray-500 mb-3">
            Become a member to unlock posting, commenting, and other exclusive
            features.
          </p>
          {!user && (
            <Link
              to="/membership"
              className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
            >
              Become a Member
            </Link>
          )}
        </div>
      </div>

      <div className="text-center border-t border-gray-100 py-4 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} CollabCorner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
