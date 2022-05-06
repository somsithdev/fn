import Axios from "axios";
import {
  SINGLE_USER_DETAIL_FAIL,
  SINGLE_USER_DETAIL_REQUEST,
  SINGLE_USER_DETAIL_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PERMISSION_FAIL,
  USER_CHANGE_PERMISSION_REQUEST,
  USER_CHANGE_PERMISSION_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
export const signin = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  try {
    const { data } = await Axios.post("/api/users/sign", {
      username,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error,
    });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
};

export const listDetailsUser = (username) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const { data } = await Axios.post("/api/users/details/led", {
      username,
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error,
    });
  }
};

export const listUsers = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/users/list");
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error,
    });
  }
};

export const detailsSingleUser = (id) => async (dispatch) => {
  dispatch({ type: SINGLE_USER_DETAIL_REQUEST });
  try {
    const { data } = await Axios.get("/api/users/" + id);
    dispatch({ type: SINGLE_USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_USER_DETAIL_FAIL,
      payload: error,
    });
  }
};

export const createUser = (
  username,
  email,
  phone,
  dob,
  password,
  admin
) => async (dispatch) => {
  dispatch({ type: USER_CREATE_REQUEST, payload: { username, password } });
  try {
    const { data } = await Axios.post("/register", {
      username,
      email,
      phone,
      dob,
      password,
      admin,
    });
    dispatch({ type: USER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload: error,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST });
  try {
    const { data } = await Axios.delete("/api/users/delete/" + id);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error,
    });
  }
};

export const updateUser = (ID, username, email, phone, dob, admin) => async (
  dispatch
) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
    console.log(ID, username, email, phone, dob, admin);
    const { data } = await Axios.put("/api/users/update/" + ID, {
      username,
      email,
      phone,
      dob,
      admin,
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error,
    });
  }
};

export const changePassword = (ID, password) => async (dispatch) => {
  dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });
  try {
    const { data } = await Axios.put("/api/users/changepass/" + ID, {
      password,
    });
    dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CHANGE_PASSWORD_FAIL,
      payload: error,
    });
  }
};

export const changePermission = (
  ID,
  led31,
  led32,
  led21,
  led22,
  led11,
  car,
  gate,
  roof
) => async (dispatch) => {
  dispatch({ type: USER_CHANGE_PERMISSION_REQUEST });
  try {
    const { data } = await Axios.put("/api/users/permission/" + ID, {
      led31,
      led32,
      led21,
      led22,
      led11,
      car,
      gate,
      roof,
    });
    dispatch({ type: USER_CHANGE_PERMISSION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CHANGE_PERMISSION_FAIL,
      payload: error,
    });
  }
};
