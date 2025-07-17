import React from "react";
import {FaGoogle} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
const SocialLogin = () => {
  const {loginWithGoogle} = useAuth();
  const location = useLocation();
  const {from} = location.state || {};
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          email: user.email,
          name: user.displayName,
          photoURL: user?.photoURL,
          role:"user",
          badges: "bronze",
          created_by: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        try {
          await axiosInstance.post("/users", userInfo);
        } catch (err) {
          if (err.response?.status === 401) {
          
            await axiosInstance.patch("/users/lastLogin", {
              email: user.email,
            });
          } else {
            console.error("DB error:", err);
          }
        }
        toast.success("Logged in successfully");
        navigate(from ? from : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-border-color"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-border-color"></div>
      </div>

      <button
        onClick={handleLoginWithGoogle}
        className="mt-4 w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-secondary hover:text-white cursor-pointer"
      >
        <FaGoogle className="mr-2" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
