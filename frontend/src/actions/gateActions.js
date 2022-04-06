import axios from "axios";

import { IP_ADDRESS } from "../constants/detailConstants";
import {
  GATE_CLOSE_FAIL,
  GATE_CLOSE_REQUEST,
  GATE_CLOSE_SUCCESS,
  GATE_OPEN_FAIL,
  GATE_OPEN_REQUEST,
  GATE_OPEN_SUCCESS,
} from "../constants/gateConstants";

export const openGate = () => async (dispatch, getState) => {
  dispatch({ type: GATE_OPEN_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/gate/open");
    const { data } = await axios.get(IP_ADDRESS + "/api/gate/open");
    dispatch({ type: GATE_OPEN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GATE_OPEN_FAIL, payload: error });
  }
};

export const closeGate = () => async (dispatch, getState) => {
  dispatch({ type: GATE_CLOSE_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/gate/close");
    const { data } = await axios.get(IP_ADDRESS + "/api/gate/close");
    dispatch({ type: GATE_CLOSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GATE_CLOSE_FAIL, payload: error });
  }
};
