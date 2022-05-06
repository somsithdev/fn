import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { statusLed } from "../actions/ledActions";
import { Card } from "../components/card";
import { Cardb } from "../components/card";
import { IP_ADDRESS } from "../constants/detailConstants";
import {
  LED_STATUS_REQUEST,
  LED_STATUS_SUCCESS,
} from "../constants/ledConstants";

const Widgets = () => {
  const ledStatus = useSelector((state) => state.ledStatus);
  const dispatch = useDispatch();
  const {
    loading: loadingStatus,
    error: errorStatus,
    success: successStatus,
    status,
  } = ledStatus;

  const interval = () =>
    setInterval(async () => {
      const { data } = await axios.get(IP_ADDRESS + "/api/status");
      dispatch({ type: LED_STATUS_SUCCESS, payload: data });
    }, 3000);

  useEffect(() => {
    dispatch(statusLed());
    interval();
  }, [dispatch]);

  return (
    <div
      style={{
        marginTop: "3%",
        marginLeft: "10%",
        marginRight: "10%",
        textAlign: "left",
      }}
    >
      <div style={{ background: "#344561", margin: "2rem 0", padding: "1rem" }}>
        <div>Trạng thái điều khiển bằng ứng dụng</div>
        <WidgetContainer>
          {status &&
            status.led.map((data) =>
              data.status === 1 ? (
                <Cardb heading={data.id + " Đang mở"} icon="bulb" />
              ) : (
                <Card heading={data.id} icon="bulb" />
              )
            )}
        </WidgetContainer>
      </div>
      <div style={{ background: "#344561", margin: "2rem 0", padding: "1rem" }}>
        <div>Trạng thái điều khiển cổng và roof</div>
        <WidgetContainer>
          {status && status.car === 1 ? (
            <Cardb heading="Cửa nhà xe Đang mở" icon="car" />
          ) : (
            <Card heading="Cửa nhà xe" icon="car" />
          )}
          {status && status.gate === 1 ? (
            <Cardb heading="Cổng nhà Đang mở" icon="dungeon" />
          ) : (
            <Card heading="Cổng nhà Đang đóng" icon="dungeon" />
          )}
          {status && status.roof === 1 ? (
            <Cardb heading="roof đang mở" icon="roof" />
          ) : (
            <Card heading="roof đang đóng" icon="roof" />
          )}
        </WidgetContainer>
      </div>
      <div style={{ background: "#344561", margin: "2rem 0", padding: "1rem" }}>
        <div>Trạng thái Sensor</div>
        <WidgetContainer>
          {status && status.pir === 1 ? (
            <Cardb heading="Đang mở đèn cầu thang" icon="walking" />
          ) : (
            <Card heading="Đèn cầu thang" icon="walking" />
          )}
          {status && status.raindrop ? (
            <Card heading="Mưa" icon="rain" />
          ) : (
            <Cardb heading="Đang mưa" icon="rain" />
          )}
          {status && status.soil ? (
            <Cardb heading="Đang tưới cây" icon="tree" />
          ) : (
            <Card heading="Tưới cây" icon="tree" />
          )}
          {status && status.temp.temperature !== "0.00" ? (
            <Cardb
              heading={
                "temperature: " +
                status.temp.temperature +
                "\nHumidity:" +
                status.temp.humidity
              }
              icon="temp"
            />
          ) : (
            <Card heading="nhiệt độ" icon="temp" />
          )}
          {status && status.photoresistor ? (
            <Card heading="Ban đêm" icon="tree" />
          ) : (
            <Cardb heading="Ban ngày" icon="tree" />
          )}
        </WidgetContainer>
      </div>
    </div>
  );
};

const WidgetContainer = styled.div`
  grid-area: widgets;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default Widgets;
