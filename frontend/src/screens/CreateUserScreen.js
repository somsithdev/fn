import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderAdmin";
import homeimg from "../images/Streaming.jpg";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
export default function CreateUserScreen(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(true);

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, success } = userCreate;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (success) {
    navigate("/admin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(createUser(username, email, phone, dob, password, admin));
    }
  };

  return (
    <div>
      <div className="grid-container">
        {loading && <Loading></Loading>}
        {error && <MessageBox variant="danger">{error.message}</MessageBox>}
        <HeaderHome />
        <main style={{ color: "white" }}>
          <a href="/listusers" className="backbut" style={{ color: "white" }}>
            <pre>{"<< Back to users list Page"}</pre>
          </a>
          <div className="row fit top">
            <div className="col-1 top" style={{ width: "60%" }}>
              <h1>Create User</h1>
              <form
                className="form"
                style={{ paddingBottom: "2rem" }}
                onSubmit={submitHandler}
              >
                <>
                  <div>
                    <label htmlFor="name">Username</label>
                    <input
                      className="input"
                      type="text"
                      // value={name}
                      id="name"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label htmlFor="image">Email</label>
                    <input
                      className="input"
                      type="email"
                      // value={email}
                      id="email"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="image">Phone number</label>
                    <input
                      className="input"
                      type="text"
                      // value={email}
                      id="phone"
                      placeholder="Enter phone number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="image">Date of Birth</label>
                    <input
                      className="input"
                      type="date"
                      // value={email}
                      id="phone"
                      placeholder="Enter phone number"
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      className="input"
                      type="password"
                      // value={password}
                      placeholder="Enter Password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      className="input"
                      type="password"
                      // value={category}
                      placeholder="Enter Confirm Password"
                      id="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="admin">Admin</label>

                    <select
                      name="plan"
                      id="plan"
                      className="input"
                      // onChange={(e) => setIsAdmin(e.target.value)}
                    >
                      <option value={true} selected>
                        Yes
                      </option>
                      <option value={false}>No</option>
                    </select>
                  </div>

                  <div>
                    <label></label>
                    <button className="primary" type="submit">
                      Create User
                    </button>
                  </div>
                </>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
