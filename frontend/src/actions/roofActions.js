import axios from "axios";
import { IP_ADDRESS } from "../constants/detailConstants";
import {
  ROOF_CLOSE_FAIL,
  ROOF_CLOSE_REQUEST,
  ROOF_CLOSE_SUCCESS,
  ROOF_OPEN_FAIL,
  ROOF_OPEN_REQUEST,
  ROOF_OPEN_SUCCESS,
} from "../constants/roofConstants";

export const openRoof = () => async (dispatch, getState) => {
  dispatch({ type: ROOF_OPEN_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/roof/open");
    const { data } = await axios.get(IP_ADDRESS + "/api/roof/open");
    dispatch({ type: ROOF_OPEN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ROOF_OPEN_FAIL, payload: error });
  }
};

export const closeRoof = () => async (dispatch, getState) => {
  dispatch({ type: ROOF_CLOSE_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/roof/close");
    const { data } = await axios.get(IP_ADDRESS + "/api/roof/close");
    dispatch({ type: ROOF_CLOSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ROOF_CLOSE_FAIL, payload: error });
  }
};
