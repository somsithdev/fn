import React, { Component } from "react";
import SigninScreen from "./screens/SigninScreen";
import "./App.css";
import ControllScreen from "./screens/ControllScreen";
import DashboardScreen from "./screens/DashboardScreen";
import LedScreen from "./screens/LedScreen";
import GateScreen from "./screens/GateScreen";
import RoofScreen from "./screens/RoofScreen";
import CarScreen from "./screens/CarScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoScreen from "./screens/VideoScreen";
import AdminScreen from "./screens/ListUsersScreen";
import ListUsersScreen from "./screens/ListUsersScreen";
import EditUserScreen from "./screens/EditUserScreen";
import PasswordChangeScreen from "./screens/PasswordChangeScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import PermissionScreen from "./screens/PermissionScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <div className="App">
          <Routes>
            <Route path="/" element={<SigninScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />} exact></Route>
            <Route path="/control" element={<ControllScreen />} exact></Route>
            <Route path="/light" element={<LedScreen />}></Route>
            <Route path="/gate" element={<GateScreen />}></Route>
            <Route path="/roof" element={<RoofScreen />}></Route>
            <Route path="/car" element={<CarScreen />}></Route>
            <Route path="/dashboard" element={<DashboardScreen />}></Route>
            <Route path="/video" element={<VideoScreen />}></Route>
            <Route path="/listusers" element={<ListUsersScreen />}></Route>
            <Route path="/admin" element={<ListUsersScreen />}></Route>
            <Route path="/edituser/:id" element={<EditUserScreen />}></Route>
            <Route path="/createuser" element={<CreateUserScreen />}></Route>
            <Route
              path="/permission/:id"
              element={<PermissionScreen />}
            ></Route>
            <Route
              path="/password/:id"
              element={<PasswordChangeScreen />}
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
