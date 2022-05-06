import React, { useEffect } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header2";
import homeimg from "../images/Streaming.jpg";
import { useDispatch, useSelector } from "react-redux";
import { openLed } from "../actions/ledActions";
import { listDetailsUser } from "../actions/userAction";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
export default function LedScreen(props) {
  const dispatch = useDispatch();
  const ledHandler = (value) => {
    dispatch(openLed(value));
  };
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;
  const { username } = userInfo;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingLED, details, error: errorLED } = userDetails;
  // const { led31, led21, led22, led32, led11 } = details;
  useEffect(() => {
    dispatch(listDetailsUser(username));
  }, []);
  return (
    <div>
      <div className="grid-container">
        {loading && <Loading></Loading>}
        {error && <MessageBox variant="danger">{error.message}</MessageBox>}
        {loadingLED && <Loading></Loading>}
        {errorLED && (
          <MessageBox variant="danger">{errorLED.message}</MessageBox>
        )}
        <HeaderHome />
        <main style={{ color: "white" }}>
          <a href="/control" className="backbut" style={{ color: "white" }}>
            <pre>{"<< Back to Control Page"}</pre>
          </a>
          <div
            style={{ marginTop: "1%", fontWeight: "bold", fontSize: "25px" }}
          >
            Light
          </div>
          <div className="row fit top">
            <div className="col-3 ">
              <img
                src={homeimg}
                alt=""
                width="90%"
                // style={{ margin: "1.5% 0 1.5% 0" }}
              />
            </div>
            <div className="col-1 top">
              <ul>
                {/* <div style={{ margin: "1rem", textAlign: "left" }}>
                  Functions
                </div> */}
                {details && details.led31 && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                      cursor: "pointer",
                    }}
                    onClick={() => ledHandler("led3-1")}
                  >
                    led3-1
                  </li>
                )}
                {details && details.led32 && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                      cursor: "pointer",
                    }}
                    onClick={() => ledHandler("led3-2")}
                  >
                    led3-2
                  </li>
                )}
                {details && details.led21 && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                      cursor: "pointer",
                    }}
                    onClick={() => ledHandler("led2-1")}
                  >
                    led2-1
                  </li>
                )}
                {details && details.led22 && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                      cursor: "pointer",
                    }}
                    onClick={() => ledHandler("led2-2")}
                  >
                    led2-2
                  </li>
                )}
                {details && details.led11 && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                      cursor: "pointer",
                    }}
                    onClick={() => ledHandler("led1-1")}
                  >
                    led1-1
                  </li>
                )}
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
