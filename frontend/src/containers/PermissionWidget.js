import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { changePermission, detailsSingleUser } from "../actions/userAction";
import { Card } from "../components/card";
import { Cardb } from "../components/card";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
import {
  SINGLE_USER_DETAIL_RESET,
  USER_CHANGE_PERMISSION_RESET,
} from "../constants/userConstants";

const Widgets = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const SingleUserDetails = useSelector((state) => state.SingleUserDetails);
  const {
    loading: loadingDetails,
    details,
    error: errorDetails,
  } = SingleUserDetails;
  const userChangePermission = useSelector(
    (state) => state.userChangePermission
  );
  const {
    loading: loadingPermission,
    success,
    error: errorPermission,
  } = userChangePermission;
  const [led31, setLed31] = useState();
  const [led32, setLed32] = useState();
  const [led21, setLed21] = useState();
  const [led22, setLed22] = useState();
  const [led11, setLed11] = useState();
  const [car, setCar] = useState();
  const [gate, setGate] = useState();
  const [roof, setRoof] = useState();
  const navigate = useNavigate();
  if (success) {
    dispatch({ type: USER_CHANGE_PERMISSION_RESET });
    navigate("/admin");
  }
  useEffect(() => {
    if (!details || details._id != id) {
      dispatch({ type: SINGLE_USER_DETAIL_RESET });
      dispatch(detailsSingleUser(id));
    } else {
      setLed31(details.led31);
      setLed32(details.led32);
      setLed21(details.led21);
      setLed22(details.led22);
      setLed11(details.led11);
      setCar(details.car);
      setGate(details.gate);
      setRoof(details.roof);
    }
  }, [dispatch, id, details]);

  const submitHandler = () => {
    dispatch(
      changePermission(id, led31, led32, led21, led22, led11, car, gate, roof)
    );
  };

  return (
    <div>
      {loadingDetails && <Loading></Loading>}
      {errorDetails && (
        <MessageBox variant="danger">{errorDetails.message}</MessageBox>
      )}
      {loadingPermission && <Loading></Loading>}
      {errorPermission && (
        <MessageBox variant="danger">{errorPermission.message}</MessageBox>
      )}
      <div
        style={{
          marginTop: "3%",
          marginLeft: "10%",
          marginRight: "10%",
          textAlign: "left",
        }}
      >
        <div
          style={{
            background: "#344561",
            margin: "2rem 3rem",
            padding: "rem",
          }}
        >
          <center>
            <div>Quyền điều khiển bằng ứng dụng</div>
          </center>
          <WidgetContainer>
            {led31 ? (
              <button onClick={() => setLed31(!led31)} className="button-state">
                <Cardb heading={"led3-1"} icon="bulb" />
              </button>
            ) : (
              <button onClick={() => setLed31(!led31)} className="button-state">
                <Card heading={"led3-1"} icon="bulb" />
              </button>
            )}
            {led32 ? (
              <button onClick={() => setLed32(!led32)} className="button-state">
                <Cardb heading={"led3-2"} icon="bulb" />
              </button>
            ) : (
              <button onClick={() => setLed32(!led32)} className="button-state">
                <Card heading={"led3-2"} icon="bulb" />
              </button>
            )}
            {led21 ? (
              <button onClick={() => setLed21(!led21)} className="button-state">
                <Cardb heading={"led2-1"} icon="bulb" />
              </button>
            ) : (
              <button onClick={() => setLed21(!led21)} className="button-state">
                <Card heading={"led2-1"} icon="bulb" />
              </button>
            )}
            {led22 ? (
              <button onClick={() => setLed22(!led22)} className="button-state">
                <Cardb heading={"led2-2"} icon="bulb" />
              </button>
            ) : (
              <button onClick={() => setLed22(!led22)} className="button-state">
                <Card heading={"led2-2"} icon="bulb" />
              </button>
            )}
            {led11 ? (
              <button onClick={() => setLed11(!led11)} className="button-state">
                <Cardb heading={"led1-1"} icon="bulb" />
              </button>
            ) : (
              <button onClick={() => setLed11(!led11)} className="button-state">
                <Card heading={"led1-1"} icon="bulb" />
              </button>
            )}
          </WidgetContainer>
        </div>
        <div
          style={{ background: "#344561", margin: "2rem 0", padding: "1rem" }}
        >
          <center>
            <div>Quyền điều khiển cổng và roof</div>
          </center>
          <WidgetContainer>
            {car ? (
              <button onClick={() => setCar(!car)} className="button-state">
                <Cardb heading="Cửa nhà xe" icon="car" />
              </button>
            ) : (
              <button onClick={() => setCar(!car)} className="button-state">
                <Card heading="Cửa nhà xe" icon="car" />
              </button>
            )}
            {gate ? (
              <button onClick={() => setGate(!gate)} className="button-state">
                <Cardb heading="Cổng nhà " icon="dungeon" />
              </button>
            ) : (
              <button onClick={() => setGate(!gate)} className="button-state">
                <Card heading="Cổng nhà " icon="dungeon" />
              </button>
            )}
            {roof ? (
              <button onClick={() => setRoof(!roof)} className="button-state">
                <Cardb heading="roof " icon="roof" />
              </button>
            ) : (
              <button onClick={() => setRoof(!roof)} className="button-state">
                <Card heading="roof " icon="roof" />
              </button>
            )}
          </WidgetContainer>
        </div>
        <center>
          <button style={{ marginBottom: "2rem" }} onClick={submitHandler}>
            Change perrmission
          </button>
        </center>
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
