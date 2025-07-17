import React from "react";
import Banner from "./Banner/Banner";
import Tags from "./Tags/Tags";

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
    </div>
  );
};

export default Home;
