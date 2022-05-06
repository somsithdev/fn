import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "statuses";
import { signin } from "../actions/userAction";
// import { useDispatch, useSelector } from "react-redux";
// import { signinFarm } from "../actions/userActions";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";

export default function LoginManager(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;
  if (userInfo) {
    window.location.href = "/dashboard";
  }
  const loginHandler = () => {
    dispatch(signin(username, password));
  };

  useEffect(() => {}, [userInfo]);
  return (
    <div>
      <div className="grid-container">
        <HeaderHome />
        <main>
          {loading && <Loading></Loading>}

          <div className="container">
            <div
              className="login-box animated fadeInUp"
              style={{
                background: "#202a3b",
                border: "#3c4554, 2px, solid",
              }}
            >
              <div
                className="box-header"
                style={{ background: "#6e7c93", color: "white" }}
              >
                <h2>Sign in to SmartHome</h2>
              </div>
              <label htmlFor="username" style={{ color: "white" }}>
                Username
              </label>
              <br />
              <input
                type="text"
                id="username"
                onChange={(e) => {
                  setUserName(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <br />
              <label htmlFor="password" style={{ color: "white" }}>
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <br />
              <button
                style={{
                  color: "white",
                  background: "#6e7c93",
                  height: "4rem",
                  width: "20rem",
                  marginTop: "5%",
                }}
                type="submit"
                onClick={loginHandler}
              >
                Sign In
              </button>
              <br />
            </div>
            {error && (
              <MessageBox variant="danger">
                {error.message === "Request failed with status code 401"
                  ? "Invalid Username or Password!"
                  : error.message}
              </MessageBox>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
