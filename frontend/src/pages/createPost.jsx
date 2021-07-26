import React, { useContext, useState } from "react";
import axios from "axios";

import "./css/createPost.css";
import { MyContext } from "../components/myProvider";
import { api } from "../components/config";

function CreatePost() {
  const context = useContext(MyContext);

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  const [errTitle, setErrTitle] = useState("");
  const [errStory, setErrStory] = useState("");
  const [errImg, setErrImg] = useState("");

  function checkUserType() {
    //TODO:  if user = member, return homepage
  }
  function validate() {
    if (title.length < 8) {
      setErrTitle("Title length is smaller than 8.");
      return;
    } else setErrTitle("");

    if (story.length < 20) {
      setErrStory("Story length is smaller than 20.");
      return;
    } else setErrStory("");

    const imgs = document.getElementById("img");
    if (imgs.files.length < 1) {
      setErrImg("Atleast one image is required!");
      return;
    } else setErrImg("");

    uploadImage();
  }

  function uploadImage() {
    var files = [];
    const imgs = document.getElementById("img");

    for (let z = 0; z < imgs.files.length; z++) files.push(imgs.files[z]);

    //console.log(files);
    const file = new FormData();
    for (var x = 0; x < files.length; x++) {
      if (files[x] != undefined) {
        file.append("file", files[x]);
      }
    }

    axios
      .post(`${api}/post/upload-image`, file)
      .then((res) => {
        // console.log(res);
        if (res.status == 200) {
          uploadPost();
        } else alert("Image upload failed!");
      })
      .catch(function (err) {
        alert(`${err} \nPage refresh required`);
      });
  }

  function uploadPost() {
    const imgs = document.getElementById("img");
    var imgNames = [];
    for (let z = 0; z < imgs.files.length; z++)
      imgNames.push(imgs.files[z].name);

    const cat = document.getElementById("cat").value;
    const obj = {
      title: title,
      author: context.state.account.username,
      author_id: context.state.account.userId,
      story: story,
      images: imgNames,
      category: cat,
    };

    axios.post(`${api}/post/add-thread`, obj).then((res) => {
      if (res.data._id !== undefined) {
        alert("Success!");
        clearFields();
      } else {
        alert("Something went wrong!! \nChec console for more details.");
        console.log(res.data);
      }
    });
  }

  function clearFields() {
    setTitle("");
    setStory("");
    const img = document.getElementById("img");
    img.value = null;
  }
  return (
    <div className="create-post col-flex">
      <label className="hdr">CREATE THREAD</label>
      <label>
        Creating thread as,{" "}
        <label style={{ color: "red" }}>{context.state.account.username}</label>
      </label>
      <div className="hr"></div>

      <div className="item">
        <label className="small-hdr">Enter title: </label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label className="err-pop">{errTitle}</label>
      </div>
      <div className="item">
        <label className="small-hdr">Enter story: </label>
        <textarea
          className="story"
          placeholder="Some story!"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        ></textarea>
        <label className="err-pop">{errStory}</label>
      </div>
      <div className="item">
        <label className="small-hdr">Upload Images:</label>
        <input id="img" type="file" accept="image/*" multiple></input>
        <label className="err-pop">{errImg}</label>
      </div>
      <div className="item">
        <label className="small-hdr">Select category: </label>
        <select name="cat" id="cat">
          <option value="TECH">TECH</option>
          <option value="REVIEWS">REVIEWS</option>
          <option value="FESTIVALS">FESTIVALS</option>
          <option value="ENTERTAINMENT">ENTERTAINMENT</option>
        </select>
        {/* TODO:  */}
      </div>
      <div className="item">
        <button className="btn btn-green" onClick={validate}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
