import React, {useState} from "react";
import Banner from "./Banner/Banner";
import Tags from "./Tags/Tags";
import Posts from "./Posts/Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  return (
    <div>
      {/* Banner */}
      <section>
        <Banner setPosts={setPosts} />
      </section>
      {/* Tags */}
      <section>
        <Tags setPosts={setPosts}  />
      </section>
      {/* Posts */}
      <section>
        <Posts posts={posts} setPosts={setPosts} />
      </section>
    </div>
  );
};

export default Home;
