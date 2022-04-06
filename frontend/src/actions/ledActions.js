import axios from "axios";
import { IP_ADDRESS } from "../constants/detailConstants";
import {
  LED_OPEN_CLOSE_FAIL,
  LED_OPEN_CLOSE_REQUEST,
  LED_OPEN_CLOSE_SUCCESS,
  LED_STATUS_FAIL,
  LED_STATUS_REQUEST,
  LED_STATUS_SUCCESS,
} from "../constants/ledConstants";

export const openLed = (value) => async (dispatch, getState) => {
  dispatch({ type: LED_OPEN_CLOSE_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/led/status" + value);
    const { data } = await axios.get(IP_ADDRESS + "/api/led/" + value);
    dispatch({ type: LED_OPEN_CLOSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LED_OPEN_CLOSE_FAIL, payload: error });
  }
};

export const statusLed = () => async (dispatch, getState) => {
  dispatch({ type: LED_STATUS_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/status");
    const { data } = await axios.get(IP_ADDRESS + "/api/status");
    dispatch({ type: LED_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LED_STATUS_FAIL, payload: error });
  }
};
