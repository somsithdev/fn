import React from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header2";
import homeimg from "../images/Streaming.jpg";
import { useDispatch, useSelector } from "react-redux";
import { openLed } from "../actions/ledActions";
export default function LedScreen(props) {
  const dispatch = useDispatch();
  const ledHandler = (value) => {
    dispatch(openLed(value));
  };
  return (
    <div>
      <div className="grid-container">
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
                  Tầng 3 Phòng 1
                </li>
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
                  Tầng 3 Phòng 2
                </li>
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
                  Tầng 2 Phòng 1
                </li>
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
                  Tầng 2 Phòng 2
                </li>
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
                  Tầng 1
                </li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
