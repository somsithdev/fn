import axios from "axios";
import { IP_ADDRESS } from "../constants/detailConstants";
import {
  TEMP_DATA_FAIL,
  TEMP_DATA_REQUEST,
  TEMP_DATA_SUCCESS,
  TEMP_STATUS_FAIL,
  TEMP_STATUS_REQUEST,
  TEMP_STATUS_SUCCESS,
} from "../constants/tempConstants";

export const statusTemp = () => async (dispatch, getState) => {
  dispatch({ type: TEMP_STATUS_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/temp/status");
    const { data } = await axios.get(IP_ADDRESS + "/api/temp/status");
    dispatch({ type: TEMP_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TEMP_STATUS_FAIL, payload: error });
  }
};

export const dataTemp = () => async (dispatch, getState) => {
  dispatch({ type: TEMP_DATA_REQUEST });
  try {
    console.log(IP_ADDRESS + "/api/temp/data");
    const { data } = await axios.get(IP_ADDRESS + "/api/temp/data");
    dispatch({ type: TEMP_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TEMP_DATA_FAIL, payload: error });
  }
};
