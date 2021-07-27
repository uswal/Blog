import React, { useEffect, useState } from "react";
import axios from "axios";

import { api } from "../components/config";
import CommentCard from "../components/commentCard";

import "./css/article.css";

function Article(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [story, setStory] = useState("");
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    //console.log(props.match.params);
    axios.post(`${api}/post/article`, props.match.params).then((res) => {
      setTitle(res.data.title);
      setStory(res.data.story);
      setAuthor(res.data.author);
      var list = [];
      res.data.images.forEach((elem) => {
        const addr = `${api}/get-image/${elem}`;
        list.push(<img src={addr}></img>);
      });
      setImgs(list);
    });
  }, []);

  return (
    <div className="article">
      <div className="title">{title}</div>
      <div className="stamps">By {author} | 15 hours ago</div>
      <div className="desc">{story}</div>
      {imgs}
      <div className="hr"></div>

      {/* Add comment */}

      <textarea
        className="add-comm"
        placeholder="Enter your comment here!"
      ></textarea>
      <button className="btn btn-blue btn-comm">Comment</button>

      <div className="hr"></div>

      {/* Comments on this post */}
      <br></br>
      <label className="num">
        There are <label style={{ color: "red" }}>3</label> comments!
      </label>
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </div>
  );
}

export default Article;
