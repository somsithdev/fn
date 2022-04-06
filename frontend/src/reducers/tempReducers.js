import {
  TEMP_DATA_FAIL,
  TEMP_DATA_REQUEST,
  TEMP_DATA_SUCCESS,
  TEMP_STATUS_FAIL,
  TEMP_STATUS_REQUEST,
  TEMP_STATUS_SUCCESS,
} from "../constants/tempConstants";

export const tempStatusReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case TEMP_STATUS_REQUEST:
      return { loading: true };
    case TEMP_STATUS_SUCCESS:
      return { loading: false, gardens: action.payload };
    case TEMP_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tempDataReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case TEMP_DATA_REQUEST:
      return { loading: true };
    case TEMP_DATA_SUCCESS:
      return { loading: false, gardens: action.payload };
    case TEMP_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
