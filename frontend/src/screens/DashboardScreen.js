import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusLed } from "../actions/ledActions";
import Footer from "../components/Footer";
import HeaderHome from "../components/Header2";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
import Widgets from "../containers/widgets";
import homeimg from "../images/Streaming.jpg";

export default function DashboardScreen(props) {
  const dispatch = useDispatch();
  const ledStatus = useSelector((state) => state.ledStatus);
  const { loading, error, status } = ledStatus;

  return (
    <div>
      <div className="grid-container">
        <HeaderHome />
        <main style={{ color: "white" }}>
          {loading && <Loading></Loading>}
          {error && (
            <MessageBox variant="danger">
              {error.message === "Request failed with status code 401"
                ? "Invalid Username or Password!"
                : error.message}
            </MessageBox>
          )}
          <div>
            <Widgets></Widgets>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
