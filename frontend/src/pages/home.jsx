import React, { useEffect, useState } from "react";
import axios from "axios";

import { api } from "../components/config";
import ContentCard from "../components/contentCard";

function Home() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios.post(`${api}/post/home-contents`).then((res) => {
      var list = [];
      res.data.forEach((elem) => {
        // console.log(elem);
        const img = `${api}/get-image/${elem.images[0]}`;
        list.push(
          <ContentCard
            author={elem.author}
            img={img}
            title={elem.title}
            createdAt={elem.createdAt}
            _id={elem._id}
          />
        );
      });

      setArr(list);
    });
  }, []);

  return (
    <div className="home">
      {arr}
      {/* <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard /> */}
    </div>
  );
}

export default Home;
