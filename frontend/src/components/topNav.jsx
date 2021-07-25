import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Socials from "./socials";
import Login from "./login";
import Account from "./account";
import { MyContext } from "./myProvider";

import "./css/topNav.css";

function TopNav() {
  const context = useContext(MyContext);

  function openOverlay() {
    context.state.account.loggedIn === true
      ? context.OPEN_OVERLAY(<Account />, "ACCOUNT DETAILS")
      : context.OPEN_OVERLAY(<Login />, "LOGIN");
  }

  return (
    <div className="top-nav">
      <div className="center">
        {context.state.overlayStatus}
        {/* <CenterPop title="ACCOUNT DETAILS" html={<Account />} /> */}
        <div className="item">
          <Link to="#" className="c-logo ">
            <img className="logo" src="/assets/icons/the_blog.jpg"></img>
          </Link>
        </div>
        <div className="c-cat item">
          <Link to="#">TECH</Link>
          <Link to="#">REVIEWS</Link>
          <Link to="#">FESTIVALS</Link>
          <Link to="#">ENTERTAINMENT</Link>
        </div>
        <div className="c-soc item">
          <Socials />
        </div>
        <div className="c-a item" style={{ marginRight: "0" }}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icons no-fill"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icons no-fill"
              id="ac"
              onClick={openOverlay}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
