import React, { useState } from 'react';

const AllPosts = () => {
         const [search, setSearch] = useState("");
          const [tag, setTag] = useState("");
          const [sortBy, setSortBy] = useState("recent");
          const [page, setPage] = useState(1);
          const limit = 5;
        return (
                <div>
                        
                </div>
        );
};

export default AllPosts;