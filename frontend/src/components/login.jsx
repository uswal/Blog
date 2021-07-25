import React, { useContext, useState } from "react";

import { MyContext } from "./myProvider";
import Signup from "./signup";
import { api } from "./config";

import axios from "axios";

function Login() {
  const context = useContext(MyContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errUsername, setErrUsername] = useState("");
  const [errPassword, setErrPassword] = useState("");

  function login() {
    axios.post(`${api}/account/login`, { username, password }).then((res) => {
      setErrUsername("");
      setErrPassword("");

      if (res.data.status === "NOT_FOUND")
        setErrUsername("Username not found!");
      if (res.data.status === "WRONG_PASSWORD")
        setErrPassword("Wrong password entered.");

      if (res.data.status === "SUCCESS") {
        //TODO
        console.log(res.data);

        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("contact", res.data.contact);
        localStorage.setItem("since", res.data.since);
        localStorage.setItem("type", res.data.type);

        window.location.reload(false);
      }
    });
  }

  return (
    <div className="login col-flex">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label className="err-pop">{errUsername}</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <label className="err-pop">{errPassword}</label>
      <div type="row-flex" style={{ marginTop: "20px" }}>
        <button
          className="btn btn-green"
          style={{ marginRight: "10px" }}
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
        <button
          className="btn btn-blue"
          style={{ marginRight: "10px" }}
          onClick={() => context.OPEN_OVERLAY(<Signup />, "SIGNUP")}
        >
          Create an account
        </button>
        <button className="btn btn-black-hollow">Forgot password</button>
      </div>
    </div>
  );
}

export default Login;
