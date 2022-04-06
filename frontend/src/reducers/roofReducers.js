import {
  ROOF_CLOSE_FAIL,
  ROOF_CLOSE_REQUEST,
  ROOF_CLOSE_SUCCESS,
  ROOF_OPEN_FAIL,
  ROOF_OPEN_REQUEST,
  ROOF_OPEN_SUCCESS,
} from "../constants/roofConstants";

export const roofReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case ROOF_OPEN_REQUEST:
      return { loading: true };
    case ROOF_OPEN_SUCCESS:
      return { loading: false, gardens: action.payload };
    case ROOF_OPEN_FAIL:
      return { loading: false, error: action.payload };
    case ROOF_CLOSE_REQUEST:
      return { loading: true };
    case ROOF_CLOSE_SUCCESS:
      return { loading: false, gardens: action.payload };
    case ROOF_CLOSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
