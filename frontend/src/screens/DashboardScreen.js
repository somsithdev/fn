import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusLed } from "../actions/ledActions";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header2";
import Widgets from "../containers/widgets";
import homeimg from "../images/Streaming.jpg";

export default function DashboardScreen(props) {
  return (
    <div>
      <div className="grid-container">
        <HeaderHome />
        <main style={{ color: "white" }}>
          <div>
            <Widgets></Widgets>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
