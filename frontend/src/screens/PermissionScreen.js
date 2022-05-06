import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderAdmin";
import homeimg from "../images/Streaming.jpg";
import PermissionWidget from "../containers/PermissionWidget";
import { useDispatch, useSelector } from "react-redux";
import { listDetailsUser } from "../actions/userAction";
import { useParams } from "react-router-dom";
export default function PermissionScreen(props) {
  return (
    <div>
      <div className="grid-container">
        <HeaderHome />
        <main style={{ color: "white" }}>
          <a href="/listusers" className="backbut" style={{ color: "white" }}>
            <pre>{"<< Back to users list Page"}</pre>
          </a>
          <div className="row fit top">
            <div className="col-1 top" style={{ width: "60%" }}>
              <h1>Change permission</h1>
              <PermissionWidget></PermissionWidget>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
