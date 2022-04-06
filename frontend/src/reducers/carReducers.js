import {
  CAR_CLOSE_FAIL,
  CAR_CLOSE_REQUEST,
  CAR_CLOSE_SUCCESS,
  CAR_OPEN_FAIL,
  CAR_OPEN_REQUEST,
  CAR_OPEN_SUCCESS,
} from "../constants/carConstants";

export const carReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case CAR_OPEN_REQUEST:
      return { loading: true };
    case CAR_OPEN_SUCCESS:
      return { loading: false, gardens: action.payload };
    case CAR_OPEN_FAIL:
      return { loading: false, error: action.payload };
    case CAR_CLOSE_REQUEST:
      return { loading: true };
    case CAR_CLOSE_SUCCESS:
      return { loading: false, gardens: action.payload };
    case CAR_CLOSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
