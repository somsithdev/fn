import {
  SINGLE_USER_DETAIL_FAIL,
  SINGLE_USER_DETAIL_REQUEST,
  SINGLE_USER_DETAIL_RESET,
  SINGLE_USER_DETAIL_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_RESET,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PERMISSION_FAIL,
  USER_CHANGE_PERMISSION_REQUEST,
  USER_CHANGE_PERMISSION_RESET,
  USER_CHANGE_PERMISSION_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, details: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const SingleUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_USER_DETAIL_REQUEST:
      return { loading: true };
    case SINGLE_USER_DETAIL_SUCCESS:
      return { loading: false, details: action.payload };
    case SINGLE_USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_USER_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, success: true };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case USER_CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case USER_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userChangePermissionReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_PERMISSION_REQUEST:
      return { loading: true };
    case USER_CHANGE_PERMISSION_SUCCESS:
      return { loading: false, success: true };
    case USER_CHANGE_PERMISSION_FAIL:
      return { loading: false, error: action.payload };
    case USER_CHANGE_PERMISSION_RESET:
      return {};
    default:
      return state;
  }
};
