import React from "react";
import Banner from "./Banner/Banner";
import Tags from "./Tags/Tags";
import Posts from "./Posts/Posts";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <section>
        <Banner />
      </section>
      {/* Tags */}
      <section>
        <Tags />
      </section>
      {/* Posts */}
      <section>
        <Posts />
      </section>
    </div>
  );
};

export default Home;
