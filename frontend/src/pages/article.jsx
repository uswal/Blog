import React from "react";

import CommentCard from "../components/commentCard";

import "./css/article.css";

function Article() {
  return (
    <div className="article">
      <div className="title">Piakachu pika pika</div>
      <div className="stamps">By Ujjawal Anand | 15 hours ago</div>
      <div className="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        placeat nihil nemo maiores quas harum! Rem officia vero laborum debitis
        ex eaque dignissimos vel sequi soluta maiores dolorem, quae eum.
      </div>
      <img src="/assets/images/pika.jpg"></img>
      <img src="/assets/images/pika.jpg"></img>

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
