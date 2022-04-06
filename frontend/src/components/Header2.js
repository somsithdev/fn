import React from "react";
import logo from "../images/home-logo.png";
export default function Header(props) {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div>
            <a className="brand" href="/dashboard">
              Sm
              <img src={logo} alt="a" style={{ width: "30px" }} />
              rt Home
            </a>
          </div>
          <div>
            <a href="/dashboard">Dashboard</a>
            <a href="/control">Controlling</a>
            {/* <a href="/management">Manage</a> */}
            <a href="/signin">Logout</a>
            {/* <button
              style={{
                background: "white",
                height: "5rem",
                margin: "0 0",
                color: "black",
              }}
              // onClick={() => logoutHandler}
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
