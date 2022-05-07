import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderAdmin";
import homeimg from "../images/Streaming.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  detailsSingleUser,
  listUsers,
  updateUser,
} from "../actions/userAction";
import {
  SINGLE_USER_DETAIL_RESET,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
export default function EditUserScreen(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const SingleUserDetails = useSelector((state) => state.SingleUserDetails);
  const {
    loading: loadingDetails,
    details,
    error: errorDetails,
  } = SingleUserDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;
  const navigate = useNavigate();

  if (successUpdate) {
    dispatch({ type: USER_UPDATE_RESET });
    dispatch(listUsers());
    navigate("/admin");
  }
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    if (!details || details._id !== id) {
      dispatch({ type: SINGLE_USER_DETAIL_RESET });
      dispatch(detailsSingleUser(id));
    } else {
      setUsername(details.username);
      setEmail(details.email);
      setPhone(details.phone);
      setDob(details.dob);
      setAdmin(details.isAdmin);
    }
  }, [dispatch, id, details]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, username, email, phone, dob, admin));
    console.log(id, username, email, phone, dob, admin);
  };

  return (
    <div>
      <div className="grid-container">
        {loadingDetails && <Loading></Loading>}
        {errorDetails && (
          <MessageBox variant="danger">{errorDetails.message}</MessageBox>
        )}
        {loadingUpdate && <Loading></Loading>}
        {errorUpdate && (
          <MessageBox variant="danger">{errorUpdate.messages}</MessageBox>
        )}
        <HeaderHome />
        <main style={{ color: "white" }}>
          <a href="/listusers" className="backbut" style={{ color: "white" }}>
            <pre>{"<< Back to users list Page"}</pre>
          </a>
          <div className="row fit top">
            <div className="col-1 top" style={{ width: "60%" }}>
              <h1>Edit {"some user"}</h1>
              <form
                className="form"
                style={{ paddingBottom: "2rem" }}
                onSubmit={submitHandler}
              >
                <>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      className="input"
                      type="text"
                      value={username}
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
                      value={email}
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
                      value={phone}
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
                      value={dob}
                      id="phone"
                      placeholder="Enter phone number"
                      onChange={(e) => {
                        setDob(e.target.value);
                        console.log(dob);
                      }}
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="password">Password</label>
                    <input
                      className="input"
                      type="password"
                      // value={password}
                      placeholder="Enter Password"
                      id="password"
                      // onChange={(e) => setPassword(e.target.value)}
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
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div> */}

                  <div>
                    <label htmlFor="admin">Admin</label>

                    <select
                      name="plan"
                      id="plan"
                      value={admin}
                      className="input"
                      onChange={(e) => setAdmin(e.target.value)}
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
                      Update
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
