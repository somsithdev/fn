import React from "react";
import logo from "../images/home-logo.png";
export default function Header(props) {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div>
            <a className="brand" href="/">
              Sm
              <img src={logo} alt="a" style={{ width: "30px" }} />
              rt Home
            </a>
          </div>
          <div>
            {/* <a href="/home">Home</a>
            <a href="/gardens">Your gardens</a>
            <a href="/management">Manage</a>
            <a href="/profile">Profile</a> */}
            {/* <button
              style={{ position: "absolute", right: "1%", top: "1%" }}
              onClick={() => logoutHandler}
              type="button"
            >
              Logout
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
