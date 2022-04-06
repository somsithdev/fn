import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { carReducers } from "./reducers/carReducers";
import { gateReducers } from "./reducers/gateReducers";
import {
  ledOpenCloseReducers,
  ledStatusReducers,
} from "./reducers/ledReducers";
import { tempDataReducers, tempStatusReducers } from "./reducers/tempReducers";

const reducer = combineReducers({
  ledOpenClose: ledOpenCloseReducers,
  tempStatus: tempStatusReducers,
  tempData: tempDataReducers,
  car: carReducers,
  gate: gateReducers,
  ledStatus: ledStatusReducers,
});

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
