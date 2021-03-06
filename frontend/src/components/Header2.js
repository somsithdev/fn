import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userAction";
import logo from "../images/home-logo.png";
import { Link } from "react-router-dom";
export default function Header(props) {
  const dispatch = useDispatch();
  const signoutHanler = () => {
    dispatch(signout());
  };
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;
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
            {userInfo.isAdmin && <a href="/admin">Admin</a>}
            <a>
              <Link to="/signin" onClick={signoutHanler}>
                Logout
              </Link>
            </a>
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
