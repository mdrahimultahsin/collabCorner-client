import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router";
import useAuth from "../../hooks/useAuth";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import logo from "../../assets/logo.png";
import {FaEnvelope, FaLock, FaUser} from "react-icons/fa";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import useAxiosInstance from "../../hooks/useAxiosInstance";
const JoinUs = () => {
  const {joinUsUser} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {from} = location.state || {};
  const [showPass, setShowPass] = useState(false);
  const axiosInstance = useAxiosInstance();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    joinUsUser(data.email, data.password)
      .then(async () => {
        await axiosInstance.patch("/users/lastLogin", {email: data.email});
        toast.success("Logged in successfully");
        navigate(from ? from : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="md:w-11/12 mx-auto px-4">
      <div className="  min-h-screen flex items-center justify-center md:gap-5 py-15 md:py-15 px-4 ">
        <div className="max-w-lg border border-neutral-content rounded-2xl  bg-base-200 w-full text-base-content  shadow-lg p-8 ">
          <img className="w-14 mx-auto" src={logo} alt="" />
          <h2 className="text-2xl font-bold mb-2 text-center font-heading">
            Welcome Back!
          </h2>
          <p className="text-center mb-6 text-secondary-content">
            Login to your CollabCorner account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-2">
            {/* Email */}
            <div className="flex flex-col">
              <div className="flex items-center border border-neutral-content rounded-lg px-3 py-2">
                <FaEnvelope className="text-secondary-content mr-2" />
                <input
                  {...register("email", {
                    required: true,
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent   text-secondary-content placeholder-secondary-content focus:outline-none focus:border-transparent"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-500 mt-1">
                  Email is Required
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <div className="flex items-center border border-neutral-content rounded-lg px-3 py-2 relative">
                <FaLock className="text-secondary-content mr-2" />
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-transparent   text-secondary-content placeholder-secondary-content focus:outline-none focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-5 transform -translate-y-1/2 text-secondary-content text-xl hover:text-primary transition-colors cursor-pointer"
                >
                  {showPass ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary cursor-pointer text-white font-medium py-2.5 rounded-2xl transition-colors mt-2"
            >
              Join Us
            </button>
          </form>
          <SocialLogin />
          <div className="mt-2 text-center text-sm text-secondary-content flex gap-2 justify-center">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="text-base-content border-b border-transparent hover:border-base-content font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
