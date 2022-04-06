import React from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header2";
import homeimg from "../images/Streaming.jpg";
export default function ControllScreen(props) {
  return (
    <div>
      <div className="grid-container">
        <HeaderHome />
        <main style={{ color: "white" }}>
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
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
