import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signinFarm } from "../actions/userActions";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header";
// import Loading from "../components/loading/Loading";
// import MessageBox from "../components/messageBox/MessageBox";

export default function LoginManager(props) {
  //   const [username, setUserName] = useState();
  //   const [password, setPassword] = useState();
  //   const dispatch = useDispatch();
  //   const farmLogin = useSelector((state) => state.farmLogin);
  //   const { loading, error, farmInfo } = farmLogin;
  //   if (farmInfo) {
  //     window.location.href = "/controll";
  //   }
  //   const loginHandler = () => {
  //     dispatch(signinFarm(username, password));
  //   };

  return (
    <div>
      <div className="grid-container">
        <HeaderHome title="Smartfarm-Sensor" href="/admin" />
        <main>
          {/* {loading && <Loading></Loading>}
          {error && <MessageBox variant="danger">{error}</MessageBox>} */}
          <div class="container">
            <div
              class="login-box animated fadeInUp"
              style={{
                background: "#202a3b",
                border: "#3c4554, 2px, solid",
              }}
            >
              <div
                class="box-header"
                style={{ background: "#6e7c93", color: "white" }}
              >
                <h2>Sign in to SmartHome</h2>
              </div>
              <label for="username" style={{ color: "white" }}>
                Username
              </label>
              <br />
              <input
                type="text"
                id="username"
                // onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <label for="password" style={{ color: "white" }}>
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                // onChange={(e) => setPassword(e.target.value)}
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
                //   onClick={loginHandler}
              >
                Sign In
              </button>
              <br />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
