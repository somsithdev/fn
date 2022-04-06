import {
  GATE_CLOSE_FAIL,
  GATE_CLOSE_REQUEST,
  GATE_CLOSE_SUCCESS,
  GATE_OPEN_FAIL,
  GATE_OPEN_REQUEST,
  GATE_OPEN_SUCCESS,
} from "../constants/gateConstants";

export const gateReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case GATE_OPEN_REQUEST:
      return { loading: true };
    case GATE_OPEN_SUCCESS:
      return { loading: false, gardens: action.payload };
    case GATE_OPEN_FAIL:
      return { loading: false, error: action.payload };
    case GATE_CLOSE_REQUEST:
      return { loading: true };
    case GATE_CLOSE_SUCCESS:
      return { loading: false, gardens: action.payload };
    case GATE_CLOSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
