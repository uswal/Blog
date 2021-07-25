import React, { useContext } from "react";

import { MyContext } from "./myProvider";

import "./css/centerPop.css";

function CenterPop(props) {
  const context = useContext(MyContext);
  return (
    <div className="center-pop">
      <div className="container">
        <div className="top">
          <label className="title">{props.title}</label>
          <label className="cross" onClick={context.CLOSE_OVERLAY}>
            x
          </label>
          <div className="hr"></div>
        </div>
        <div className="html">{props.html}</div>
      </div>
    </div>
  );
}

export default CenterPop;
