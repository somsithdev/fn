import React from "react";
import { useDispatch } from "react-redux";
import { closeCar, openCar } from "../actions/carActions";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header2";
import homeimg from "../images/Streaming.jpg";
export default function CarScreen(props) {
  const dispatch = useDispatch();
  const carHandler = (value) => {
    if (value === "open") {
      dispatch(openCar());
    } else {
      dispatch(closeCar());
    }
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
            Car Garage
          </div>
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
                {/* <div style={{ margin: "1rem", textAlign: "left" }}>
                  Functions
                </div> */}

                <li
                  className="card"
                  style={{
                    margin: "1rem",
                    textAlign: "center",
                    background: "#202A3B",
                  }}
                  onClick={() => carHandler("open")}
                >
                  Open
                </li>
                <li
                  className="card"
                  style={{
                    margin: "1rem",
                    textAlign: "center",
                    background: "#202A3B",
                  }}
                  onClick={() => carHandler("close")}
                >
                  Close
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
