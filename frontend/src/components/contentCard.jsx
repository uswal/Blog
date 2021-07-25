import React from "react";
import { Link } from "react-router-dom";
import "./css/contentCard.css";

function ContentCard() {
  return (
    <Link to="/article">
      <div className="card row-flex">
        <img src="/assets/images/pika.jpg"></img>
        <div className="details col-flex">
          <label className="title">
            Social networks are competetive again.
          </label>
          <label className="stamps">By Ujjawal Anand | 15 minutes ago</label>
        </div>
      </div>
    </Link>
  );
}

export default ContentCard;
