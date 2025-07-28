import React, {useState} from "react";
import Banner from "./Banner/Banner";
import Tags from "./Tags/Tags";
import Posts from "./Posts/Posts";
import Announcement from "./Announcements/Annoucements";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  return (
    <div className="bg-base-200">
      {/* Banner */}
      <section>
        <Banner setPosts={setPosts} />
      </section>

      <section className="px-4 md:px-2 lg:px-0 md:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {/* Post */}
        <div className="md:col-span-2 shadow rounded-lg bg-white order-2 md:order-1">
          <Posts posts={posts} setPosts={setPosts} />
        </div>
        {/* Tags */}
        <div className="md:col-span-1 shadow rounded-lg bg-white order-1 md:order-2">
          <div>
            <Tags setPosts={setPosts} />
          </div>
          <div>
            <Announcement/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
