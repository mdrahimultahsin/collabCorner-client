import { FaUser, FaPlusCircle, FaListAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";


const DashboardHome = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Welcome to Your Dashboard
        </h2>
        <p className="text-base-content ">
          Hello <span className="font-semibold">{user?.displayName || "User"}</span>! 
          Here you can manage your profile, create posts, and track your activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div onClick={()=>navigate("/dashboard/userProfile")} className="bg-base-200 p-4 rounded-xl shadow hover:shadow-md transition-all cursor-pointer">
          <FaUser className="text-3xl text-primary mb-2" />
          <h4 className="font-semibold text-lg mb-1">My Profile</h4>
          <p className="text-sm text-base-content">
            View and update your profile information.
          </p>
        </div>

        <div onClick={()=>navigate("/dashboard/addPost")} className="bg-base-200 p-4 rounded-xl shadow hover:shadow-md transition-all cursor-pointer">
          <FaPlusCircle className="text-3xl text-primary mb-2" />
          <h4 className="font-semibold text-lg mb-1">Add Post</h4>
          <p className="text-sm text-base-content">
            Create a new post and share with the community.
          </p>
        </div>

        <div onClick={()=>navigate("/dashboard/myPosts")} className="bg-base-200 p-4 rounded-xl shadow hover:shadow-md transition-all cursor-pointer">
          <FaListAlt className="text-3xl text-primary mb-2" />
          <h4 className="font-semibold text-lg mb-1">My Posts</h4>
          <p className="text-sm text-base-content">
            View, edit or delete your submitted posts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
