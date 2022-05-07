import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDetailsUser } from "../actions/userAction";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header2";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
import homeimg from "../images/Streaming.jpg";
export default function ControllScreen(props) {
  const dispatch = useDispatch();

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
        <HeaderHome />
        <main style={{ color: "white" }}>
          {loading && <Loading></Loading>}
          {error && <MessageBox variant="danger">{error.message}</MessageBox>}
          {loadingLED && <Loading></Loading>}
          {errorLED && (
            <MessageBox variant="danger">{error.message}</MessageBox>
          )}
          <div className="row fit top">
            <div className="col-3 ">
              <img
                src={homeimg}
                alt=""
                width="90%"
                style={{ margin: "1.5% auto" }}
              />
            </div>
            <div className="col-1 top">
              <ul>
                <div style={{ margin: "1rem", textAlign: "left" }}>
                  Functions
                </div>
                {details &&
                  (details.led31 ||
                    details.led32 ||
                    details.led21 ||
                    details.led22 ||
                    details.led11) && (
                    <li
                      className="card"
                      style={{
                        margin: "1rem",
                        textAlign: "center",
                        background: "#202A3B",
                      }}
                    >
                      <a href="/light" style={{ color: "white" }}>
                        Lighting
                      </a>
                    </li>
                  )}
                {details && details.car && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                    }}
                  >
                    <a href="/car" style={{ color: "white" }}>
                      Car
                    </a>
                  </li>
                )}
                {details && details.gate && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                    }}
                  >
                    <a href="/gate" style={{ color: "white" }}>
                      Gate
                    </a>
                  </li>
                )}
                {details && details.roof && (
                  <li
                    className="card"
                    style={{
                      margin: "1rem",
                      textAlign: "center",
                      background: "#202A3B",
                    }}
                  >
                    <a href="/roof" style={{ color: "white" }}>
                      Roof
                    </a>
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
