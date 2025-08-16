import React from "react";
import { BiSearch } from "react-icons/bi";
import { GiSparkles } from "react-icons/gi";

const Banner = ({ setSearch, search, handleSearch }) => {
  return (
    <div className="relative overflow-hidden bg-base-200">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 dark:from-primary/20 dark:via-secondary/10 dark:to-accent/10"></div>
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148,163,184,0.3) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-base-100/80 dark:bg-base-200/80 backdrop-blur-sm rounded-full px-6 py-3 border border-base-content/20 dark:border-base-content/30 shadow-lg">
            <GiSparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-base-content dark:text-base-100">
              Built for Career Growth
            </span>
          </div>

          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight font-urbanist tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-base-content via-primary to-hover-color dark:from-base-100 dark:via-primary dark:to-accent">
                Connect Through Code, Collaborate to Create,
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-hover-color">
                Ideas Shared Freely
              </span>
            </h1>

            <p className="text-lg lg:text-xl md:text-2xl text-secondary-content  max-w-3xl mx-auto leading-relaxed">
              Join a vibrant community of developers, recruiters, and innovators
              engaging in thoughtful discussions, sharing ideas, and pushing the
              boundaries of technology.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-[95%] lg:max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60"></div>
              <div className="relative bg-base-100/90 dark:bg-base-200/90 backdrop-blur-xl rounded-3xl p-3 border border-base-content/20 dark:border-base-content/30 shadow-2xl">
                <form
                  onSubmit={handleSearch}
                  className="flex justify-between items-center relative gap-2"
                >
                  <div className="flex items-center gap-5 w-full">
                    <BiSearch className="text-base-content/50 dark:text-base-100/50 h-6 w-6 ml-4" />
                    <input
                      placeholder="Search by tags"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full py-3 bg-transparent focus-visible:ring-0 text-base-content dark:text-base-100 placeholder:text-base-content/50 dark:placeholder:text-base-100/50 text-lg font-medium outline-none"
                    />
                  </div>

                  {search.length > 0 && (
                    <span
                      onClick={() => setSearch("")}
                      className="cursor-pointer btn btn-xs bg-red-50 text-black dark:bg-base-100 dark:text-black"
                    >
                      x
                    </span>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary rounded-2xl h-full md:px-10 py-3 md:py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
