import React from "react";

import "./css/createPost.css";
import { MyContext } from "../components/myProvider";
import { api } from "../components/config";

function CreatePost() {
  return (
    <div className="create-post col-flex">
      <label className="hdr">CREATE THREAD</label>
      <div className="hr"></div>

      <div className="item">
        <label className="small-hdr">Enter title: </label>
        <input
          type="text"
          palceholder="Enter title"
          placeholder="Title"
        ></input>
      </div>
      <div className="item">
        <label className="small-hdr">Enter story: </label>
        <textarea className="story" placeholder="Some story!"></textarea>
      </div>
      <div className="item">
        <label className="small-hdr">Upload Images:</label>
        <input type="file"></input>
      </div>

      <div className="item">
        <button className="btn btn-green">SUBMIT</button>
      </div>
    </div>
  );
}

export default CreatePost;
