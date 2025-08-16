import React from "react";
import {Link} from "react-router";
import {FaFacebookF, FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";
import CollabCornerLogo from "../CollabCornerLogo/CollabCornerLogo";
import useAuth from "../../../hooks/useAuth";

const Footer = () => {
  const {user} = useAuth();
  return (
    <footer className="bg-base-100/70 shadow border-t border-neutral-content  text-sm text-base-content">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 grid-cols-1 gap-5">
        {/* Logo and description */}
        <div className="space-y-3">
          <CollabCornerLogo />
          <p className="text-secondary-content">
            CollabCorner is a collaborative space to share ideas, discuss
            topics, and build community around social impact and development.
          </p>
          <div className="flex space-x-4 mt-2 text-lg">
            <a
              href="https://facebook.com/mdrhtahsin"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/MdrhTahsin"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/mdrahimultahsin"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/rahimultahsin"
              target="_blank"
              rel="noreferrer"
            >
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
              <Link to="/allPosts" className="hover:underline">
                All Posts
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Tags
              </Link>
            </li>
            <li>
              <Link to="/membership" className="hover:underline">
                Membership
              </Link>
            </li>
          </ul>
        </div>

        {/* Community Links */}
        <div>
          <h3 className="font-semibold mb-3">Community</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Acknowledgement / Call to Action */}
        <div>
          <h3 className="font-semibold mb-3">Join the Movement</h3>
          <p className="text-secondary-content mb-3">
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

      <div className="text-center border-t border-gray-100 py-4 text-xs text-secondary-content">
        &copy; {new Date().getFullYear()} CollabCorner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
