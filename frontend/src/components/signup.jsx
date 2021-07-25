import React, { useContext, useState } from "react";

import axios from "axios";

import { api } from "./config";
import { MyContext } from "./myProvider";
import Login from "./login";

function Signup() {
  const context = useContext(MyContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [bool, setBool] = useState(false);

  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errRePassword, setErrRePassword] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errContact, setErrContact] = useState("");
  const [errTc, setErrTc] = useState("");

  function signup() {
    axios
      .post(`${api}/account/signup`, {
        name,
        email,
        password,
        contact,
        username,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.success) {
          if (res.data.type === "USERNAME") setErrUsername(res.data.message);

          if (res.data.type === "EMAIL") setErrEmail(res.data.message);
        } else {
          //it returns res.data.obj
          //Use that for local storage and refresh the page
          const data = res.data.obj;
          localStorage.setItem("user_id", data._id);
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("username", data.username);
          localStorage.setItem("contact", data.contact);
          localStorage.setItem("since", data.createdAt);
          localStorage.setItem("type", data.type);

          window.location.reload(false);
        }
      });
  }

  function validateAll() {
    if (!bool) {
      setErrTc("You must accept T&C before signing up.");
      return;
    } else {
      setErrTc("");
    }

    var temp;
    var count = 0;

    temp = Vname(name);
    if (temp) count++;

    temp = Vpassword(password, rePassword);
    if (temp) count++;

    temp = Vemail(email);
    if (temp) count++;

    temp = Vcontact(contact);
    if (temp) count++;

    if (count >= 4) signup();
  }

  function Vname(value) {
    if (value.length < 6) {
      setErrName("Invalid name!");
      return false;
    } else {
      setErrName("");
      return true;
    }
  }

  function Vpassword(pass1, pass2) {
    if (pass1.length < 6) {
      setErrPassword("Password can't be smaller than 6 characters.");
      return false;
    } else {
      setErrPassword("");
      if (pass1 !== pass2) {
        setErrRePassword("Password didn't match");
        return false;
      } else {
        setErrRePassword("");
        return true;
      }
    }
  }

  function Vemail(value) {
    if (value.length < 8) {
      setErrEmail("Invalid email.");
      return false;
    } else {
      setErrEmail("");
      return true;
    }
  }

  function Vcontact(value) {
    if (value.length < 10) {
      setErrContact("Invalid contact.");
      return false;
    } else {
      setErrContact("");
      return true;
    }
  }
  return (
    <div className="signup col-flex">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          Vname(e.target.value);
        }}
      ></input>
      <label className="err-pop">{errName}</label>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          Vemail(e.target.value);
        }}
      ></input>
      <label className="err-pop">{errEmail}</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          Vpassword(e.target.value, rePassword);
        }}
      ></input>
      <label className="err-pop">{errPassword}</label>
      <input
        type="password"
        placeholder="Re-Enter Password"
        value={rePassword}
        onChange={(e) => {
          setRePassword(e.target.value);
          Vpassword(password, e.target.value);
        }}
      ></input>
      <label className="err-pop">{errRePassword}</label>
      <input
        type="text"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) => {
          setContact(e.target.value);
          Vcontact(e.target.value);
        }}
      ></input>
      <label className="err-pop">{errContact}</label>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label className="err-pop">{errUsername}</label>
      <div className="row-flex" style={{ marginTop: "20px" }}>
        <input
          type="checkbox"
          checked={bool}
          onChange={(e) => {
            setBool(e.target.checked);
          }}
        ></input>
        <label className="check-label">
          I agree to all the terms and conditions mentioned in this website.
        </label>
      </div>
      <label className="err-pop">{errTc}</label>
      <div className="row-flex" style={{ marginTop: "10px" }}>
        <button
          className="btn btn-blue"
          style={{ marginRight: "10px" }}
          onClick={validateAll}
        >
          SIGNUP
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

export default Signup;
