import React, { useContext, useState } from "react";

import { MyContext } from "./myProvider";
import axios from "axios";
import { api } from "./config";
import { isoToString } from "./functions";

function Account() {
  const context = useContext(MyContext);
  const data = context.state.account;

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  function validate(pass1, pass2) {
    setMsg("");
    if (oldPass.length === 0) {
      setErr("Old password can't be left empty");
      return false;
    } else if (pass1 !== pass2) {
      setErr("New & Re Password didn't match!");
      return false;
    } else {
      setErr("");
      return true;
    }
  }

  function send() {
    const bool = validate(newPass, rePass);
    if (!bool) {
      setErr("Inputs missing!");
      return;
    }
    const _id = data.userId;
    axios
      .post(`${api}/account/update-pass`, { oldPass, newPass, _id })
      .then((res) => {
        if (res.data) {
          setMsg("Password changed successfully!");
          setOldPass("");
          setNewPass("");
          setRePass("");
        } else {
          setErr("Old password didn't match!");
        }
      });
  }
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
            Member Since:{" "}
            <label style={{ color: "grey" }}>{isoToString(data.since)}</label>
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
          <input
            type="password"
            placeholder="Enter Old Password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              validate(e.target.value, rePass);
            }}
          ></input>
          <input
            type="password"
            placeholder="Re-enter New Password"
            value={rePass}
            onChange={(e) => {
              setRePass(e.target.value);
              validate(newPass, e.target.value);
            }}
          ></input>
          <label className="err">{err}</label>
          <label className="msg">{msg}</label>
          <button
            className="btn btn-blue"
            style={{ marginTop: "10px" }}
            onClick={send}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
