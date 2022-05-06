import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { carReducers } from "./reducers/carReducers";
import { gateReducers } from "./reducers/gateReducers";
import {
  ledOpenCloseReducers,
  ledStatusReducers,
} from "./reducers/ledReducers";
import { tempDataReducers, tempStatusReducers } from "./reducers/tempReducers";
import {
  SingleUserDetailsReducer,
  userChangePasswordReducer,
  userChangePermissionReducer,
  userCreateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userSigninReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  ledOpenClose: ledOpenCloseReducers,
  tempStatus: tempStatusReducers,
  tempData: tempDataReducers,
  car: carReducers,
  gate: gateReducers,
  ledStatus: ledStatusReducers,
  userSignin: userSigninReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  SingleUserDetails: SingleUserDetailsReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userChangePassword: userChangePasswordReducer,
  userChangePermission: userChangePermissionReducer,
});

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
