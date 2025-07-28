import {useState} from "react";
import {FaEnvelope, FaImage, FaLock, FaUser} from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router";
import logo from "../../assets/logo.png";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {toast} from "react-toastify";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import {useForm} from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const {registerUser, updateUser} = useAuth();
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();
  const {from} = location.state || {};
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImgOnChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_ImageUploadAPI
    }`;

    try {
      setIsUploading(true);
      const res = await axios.post(imageUploadURL, formData);
      setImageUrl(res.data.data.display_url);
      toast.success("Profile image uploaded!");
    } catch (err) {
      toast.error(err?.message || "Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      toast.error("Please upload your profile image.");
      return;
    }

    const userInfo = {
      email: data.email,
      name: data.name,
      photoURL: imageUrl,
      role: "user",
      badges: "bronze",
      created_by: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    registerUser(data.email, data.password)
      .then(async () => {
        await updateUser({displayName: data?.name, photoURL: imageUrl});
        axiosInstance
          .post("/users", userInfo)
          .then(() => toast.success("Registered Successfully"))
          .catch(() => {});
        navigate(from ? from : "/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="md:w-11/12 mx-auto px-4">
      <div className="min-h-screen flex items-center justify-center md:gap-5 py-15 px-4">
        <div className="max-w-lg border border-border-color rounded-2xl bg-base-200 w-full text-base-content shadow-lg p-8">
          <img className="w-14 mx-auto" src={logo} alt="Logo" />
          <h2 className="text-2xl font-bold mb-2 text-center mt-3 font-heading">
            Create Your Free Account
          </h2>
          <p className="text-center mb-6 text-neutral">
            Be part of the conversation. Join the CollabCorner community today.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-2">
            {/* Name */}
            <div className="flex flex-col">
              <div className="flex items-center border border-border-color rounded-lg px-3 py-2">
                <FaUser className="text-secondary-content mr-2" />
                <input
                  {...register("name", {required: "Name is required"})}
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent text-neutral placeholder-secondary-content focus:outline-none"
                />
              </div>
              {errors.name && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <div className="flex items-center border border-border-color rounded-lg px-3 py-2">
                <FaEnvelope className="text-secondary-content mr-2" />
                <input
                  {...register("email", {required: true})}
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent text-neutral placeholder-secondary-content focus:outline-none"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-500 mt-1">
                  Email is required
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <div className="flex items-center border border-border-color rounded-lg px-3 py-2 relative">
                <FaLock className="text-secondary-content mr-2" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "At least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Must have at least one uppercase and one lowercase",
                    },
                  })}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-transparent text-neutral placeholder-secondary-content focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-content text-xl hover:text-primary"
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

            {/* Image Upload */}
            <div className="flex flex-col">
              <label className="text-sm mb-1 font-medium text-neutral">
                Upload your profile pic
              </label>
              <div className="flex items-center border border-border-color rounded-lg px-3 py-3 cursor-pointer">
                <FaImage className="text-secondary-content mr-2" />
                <input
                  type="file"
                  onChange={handleImgOnChange}
                  className="w-full text-sm bg-transparent text-neutral placeholder-secondary-content focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary cursor-pointer text-white font-medium py-2.5 rounded-2xl transition-colors mt-2 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Uploading...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <SocialLogin />

          <div className="mt-2 text-center text-sm text-neutral flex gap-2 justify-center">
            <p>Already have an account?</p>
            <Link
              to="/joinUs"
              className="text-base-content border-b border-transparent hover:border-base-content font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
