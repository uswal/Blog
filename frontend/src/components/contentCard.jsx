import React from "react";
import { Link } from "react-router-dom";

import "./css/contentCard.css";
import { ago } from "./functions";

function ContentCard(props) {
  const link = `/article/${props._id}`;
  return (
    <Link to={link}>
      <div className="card row-flex">
        <img src={props.img}></img>
        <div className="details col-flex">
          <label className="title">{props.title}</label>
          <label className="stamps">
            By {props.author} | {ago(props.createdAt)}
          </label>
        </div>
      </div>
    </Link>
  );
}

export default ContentCard;
