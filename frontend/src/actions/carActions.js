import axios from "axios";
import {
  CAR_CLOSE_FAIL,
  CAR_CLOSE_REQUEST,
  CAR_CLOSE_SUCCESS,
  CAR_OPEN_FAIL,
  CAR_OPEN_REQUEST,
  CAR_OPEN_SUCCESS,
} from "../constants/carConstants";
import { IP_ADDRESS } from "../constants/detailConstants";

export const openCar = () => async (dispatch, getState) => {
  dispatch({ type: CAR_OPEN_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/car/open");
    const { data } = await axios.get(IP_ADDRESS + "/api/car/open");
    dispatch({ type: CAR_OPEN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CAR_OPEN_FAIL, payload: error });
  }
};

export const closeCar = () => async (dispatch, getState) => {
  dispatch({ type: CAR_CLOSE_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/car/close");
    const { data } = await axios.get(IP_ADDRESS + "/api/car/close");
    dispatch({ type: CAR_CLOSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CAR_CLOSE_FAIL, payload: error });
  }
};
