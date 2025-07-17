import {FaMedal} from "react-icons/fa";

import {Link} from "react-router";
import useAuth from "../../../hooks/useAuth";
import {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
  const {user} = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`/users?email=${user?.email}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (user) {
      axiosSecure
        .get(`/posts?email=${user.email}`)
        .then((res) => {
          setRecentPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, axiosSecure]);

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary font-urbanist">
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/fFkZ2sp/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-primary"
        />
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-semibold">{user?.displayName}</h3>
          <p className="text-secondary-content">{user?.email}</p>

          {/* Badges */}
          <div className="flex gap-4 mt-2">
            {/* Bronze Badge (Registered Users) */}
            {user?.email && (
              <div className="flex items-center gap-2 text-yellow-600">
                <FaMedal className="text-xl" />
                <span className="font-medium">Bronze Badge awarded</span>
              </div>
            )}

            {/* Gold Badge (Members) */}
            {userInfo?.badges === "gold" && (
              <div className="flex items-center gap-2 text-yellow-400">
                <FaMedal className="text-xl" />
                <span className="font-medium">Gold Badge awarded</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-secondary-content font-urbanist">
          My Recent Posts:
        </h4>

        {recentPosts.length === 0 ? (
          <p className="text-base-content">You have not posted anything yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-base-200 border border-border-color rounded-xl shadow-md p-4 hover:shadow-lg transition duration-200"
              >
                <h5 className="text-lg font-bold text-primary line-clamp-1">
                  {post.title}
                </h5>
                <p className="text-sm text-base-content mt-1 line-clamp-3">
                  {post.description || "No description"}
                </p>

                {/* Optional Tags */}
                {post.tag && (
                  <div className="mt-2">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 text-xs rounded-full">
                      #{post.tag}
                    </span>
                  </div>
                )}

                {/* View Details Link */}
                <div className="mt-3">
                  <Link
                    to={`/post/${post._id}`}
                    className="text-sm btn btn-accent hover:underline font-medium text-white"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
