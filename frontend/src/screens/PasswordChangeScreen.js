import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderAdmin";
import homeimg from "../images/Streaming.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../actions/userAction";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
export default function PasswordChangeScreen(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { loading, success, error } = userChangePassword;
  const navigate = useNavigate();
  if (success) {
    navigate("/admin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(changePassword(id, password));
    }
  };
  // useEffect(() => {
  //   dispatch(detailsSingleUser(id));
  // }, []);
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
              <h1>Change password</h1>
              <form
                className="form"
                style={{ paddingBottom: "2rem" }}
                onSubmit={submitHandler}
              >
                <>
                  {/* <div>
                    <label htmlFor="oldpassword">Old Password</label>
                    <input
                      className="input"
                      type="password"
                      // value={password}
                      placeholder="Enter Old Password"
                      id="oldpassword"
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </div> */}
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
                    <label></label>
                    <button className="primary" type="submit">
                      Change password
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
