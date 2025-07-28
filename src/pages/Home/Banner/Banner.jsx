import React, {useState} from "react";
import {BiSearch, BiTrendingUp} from "react-icons/bi";
import {FaUser} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import {GiSparkles} from "react-icons/gi";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
const states = [
  {
    icon: FaUser,
    label: "Active Members",
    value: "12.5K+",
    gradient: "from-blue-500 to-cyan-500",
    description: "Growing community",
  },
  {
    icon: FaMessage,
    label: "Discussions",
    value: "8.2K+",
    gradient: "from-emerald-500 to-green-500",
    description: "Daily conversations",
  },
  {
    icon: BiTrendingUp,
    label: "Expert Answers",
    value: "25K+",
    gradient: "from-violet-500 to-purple-500",
    description: "Quality responses",
  },
];
const Banner = ({setPosts}) => {
  const [search, setSearch] = useState("");
  const axiosInstance = useAxiosInstance();
  const handleSearch = async () => {
    setSearch("");
    if (!search.trim()) return;
    try {
      await axiosInstance
        .get(`/posts?search=${search}`)
        .then((res) => {
          setPosts(res.data);
          setSearch("");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-emerald-500/10"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.3) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200/60 shadow-lg">
            <GiSparkles className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-semibold text-slate-700">
              Built for Career Growth
            </span>
          </div>

          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-primary to-hover-color bg-clip-text text-transparent">
                Connect Through Code, Collaborate to Create,
              </span>
              <span className="block bg-gradient-to-r from-primary via-accent to-hover-color bg-clip-text text-transparent">
                Ideas Shared Freely
              </span>
            </h1>

            <p className="text-lg lg:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Join a vibrant community of developers, recruiters, and innovators
              engaging in thoughtful discussions, sharing ideas, and pushing the
              boundaries of technology.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-[95%] lg:max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-3 border border-slate-200/60 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <BiSearch className="absolute left-1 lg:left-18 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6 " />
                    <input
                      placeholder="Search by tags"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-7 lg:pl-1 py-6 border-0 bg-transparent focus-visible:ring-0 text-slate-700 placeholder:text-slate-400 text-lg font-medium outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="btn btn-primary rounded-2xl h-full md:px-10 py-3 md:py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {states.map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-slate-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-slate-500">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
