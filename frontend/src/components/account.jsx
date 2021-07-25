import React, { useContext } from "react";

import { MyContext } from "./myProvider";

function Account() {
  const context = useContext(MyContext);
  const data = context.state.account;

  return (
    <div className="account row-flex">
      <div className="col-1 col-flex">
        <button
          className="btn btn-black"
          style={{ fontSize: "14px", padding: "10px" }}
        >
          Settings
        </button>
        <button
          className="btn btn-black-hollow"
          style={{ fontSize: "14px", padding: "10px", marginTop: "2px" }}
          onClick={() => {
            context.LOG_ME_OUT();
          }}
        >
          Logout
        </button>
      </div>
      <div className="col-2 col-flex">
        <div className="item">
          <label>
            Name: <label style={{ color: "grey" }}>{data.name}</label>
          </label>
        </div>
        <div className="item">
          <label>
            Email: <label style={{ color: "grey" }}>{data.email}</label>
          </label>
        </div>
        <div className="item">
          <label>
            Username: <label style={{ color: "grey" }}>{data.username}</label>
          </label>
        </div>
        <div className="item">
          <label>
            Contact: <label style={{ color: "grey" }}>{data.contact}</label>
          </label>
        </div>
        <div className="item">
          <label>
            Member Since: <label style={{ color: "grey" }}>{data.since}</label>
          </label>
        </div>
        <div
          className="hr"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        ></div>
        <div className="col-flex" style={{ width: "70%" }}>
          <div style={{ fontWeight: "800", fontSize: "18px" }}>
            UPDATE PASSWORD
          </div>
          <input type="password" placeholder="Enter Old Password"></input>
          <input type="password" placeholder="Enter New Password"></input>
          <input type="password" placeholder="Re-enter New Password"></input>
          <button className="btn btn-blue" style={{ marginTop: "10px" }}>
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
