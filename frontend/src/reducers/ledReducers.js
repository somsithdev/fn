import {
  LED_OPEN_CLOSE_FAIL,
  LED_OPEN_CLOSE_REQUEST,
  LED_OPEN_CLOSE_SUCCESS,
  LED_STATUS_FAIL,
  LED_STATUS_REQUEST,
  LED_STATUS_SUCCESS,
} from "../constants/ledConstants";

export const ledOpenCloseReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case LED_OPEN_CLOSE_REQUEST:
      return { loading: true };
    case LED_OPEN_CLOSE_SUCCESS:
      return { loading: false, gardens: action.payload };
    case LED_OPEN_CLOSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ledStatusReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case LED_STATUS_REQUEST:
      return { loading: true };
    case LED_STATUS_SUCCESS:
      return { loading: false, status: action.payload };
    case LED_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
