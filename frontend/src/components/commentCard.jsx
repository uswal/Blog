import React from "react";

function CommentCard() {
  return (
    <div className="card col-flex">
      <label
        className="stamp"
        style={{
          color: "grey",
          fontSize: "16px",
          backgroundColor: "whitesmoke",
        }}
      >
        <label style={{ color: "green", fontWeight: "bold" }}>Ujjwal</label>{" "}
        posted on 24-Dec-21
      </label>
      <label className="comment" style={{ fontSize: "14px", marginTop: "6px" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quas
        obcaecati numquam, doloribus magni eaque voluptates perspiciatis
        provident dolorem laborum corporis nobis repudiandae temporibus vero ea
        natus dolor excepturi neque.
      </label>
    </div>
  );
}

export default CommentCard;
