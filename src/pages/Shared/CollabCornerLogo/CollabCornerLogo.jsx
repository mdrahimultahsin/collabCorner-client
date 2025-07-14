import React from "react";
import logo from "../../../assets/logo.png";
import {Link} from "react-router";
const CollabCornerLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="w-16">
        <img src={logo} alt="" />
      </div>
      <span className="text-xl font-bold font-urbanist -ml-1">CollabCorner</span>
    </Link>
  );
};

export default CollabCornerLogo;
