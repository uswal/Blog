import axios from "axios";
import React, { useState, useContext } from "react";
import { api } from "./config";
import { MyContext } from "./myProvider";
import Login from "./login";

function ForgotPassword() {
  const context = useContext(MyContext);

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  function validate() {
    if (email.length === 0) {
      setErr("Email can't be empty!");
      return;
    }
    if (contact.length === 0) {
      setErr("Contact can't be empty!");
      return;
    }
    if (pass !== rePass) {
      setErr("Passwords didn't match!");
    } else {
      setErr("");
      send();
    }
  }
  function send() {
    axios
      .post(`${api}/account/reset-pass`, { email, contact, pass })
      .then((res) => {
        if (res.data) {
          setMsg(`Account password changed for ${email}!`);
          setErr("");
          setEmail("");
          setPass("");
          setRePass("");
          setContact("");
        } else {
          setErr("Email and contact combination didn't match!");
          setMsg("");
        }
      });
  }
  return (
    <div className="forgot-password col-flex">
      <input
        type="text"
        placeholder="Enter contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Enter New Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Re-Enter New Password"
        value={rePass}
        onChange={(e) => setRePass(e.target.value)}
      ></input>
      <label
        className="err-pop msg"
        style={{ color: "green", marginTop: "10px" }}
      >
        {msg}
      </label>
      <label className="err-pop">{err}</label>
      <div className="row-flex" style={{ marginTop: "10px" }}>
        <button
          className="btn btn-black-hollow"
          style={{ marginRight: "10px" }}
          onClick={validate}
        >
          RESET
        </button>
        <button
          className="btn btn-green"
          onClick={() => context.OPEN_OVERLAY(<Login />, "LOGIN")}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
