import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faKey,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import React, { useEffect } from "react";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderAdmin";
import homeimg from "../images/Streaming.jpg";
import { black } from "color-name";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { USER_DELETE_RESET, USER_LIST_RESET } from "../constants/userConstants";
import Loading from "../components/loading/Loading";
import MessageBox from "../components/messageBox/MessageBox";
export default function ListUsersScreen(props) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success } = userDelete;
  if (success) {
    dispatch({ type: USER_DELETE_RESET });
    dispatch(listUsers());
  }
  useEffect(() => {
    dispatch(listUsers());
  }, []);
  const permissionHandler = (id) => {
    window.location.href = "/permission/" + id;
  };
  const editHandler = (id) => {
    window.location.href = "/edituser/" + id;
  };
  const addHandler = (id) => {
    window.location.href = "/createuser";
  };
  const passwordHandler = (id) => {
    window.location.href = "/password/" + id;
  };
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div>
      <div className="grid-container">
        {loading && <Loading></Loading>}
        {error && <MessageBox variant="danger">{error.message}</MessageBox>}
        {loadingDelete && <Loading></Loading>}
        {errorDelete && (
          <MessageBox variant="danger">{error.message}</MessageBox>
        )}
        <HeaderHome />
        <main style={{ color: "white" }}>
          <div
            className="row fit "
            style={{
              backgroundColor: "transparent",
            }}
          >
            <button
              type="button"
              style={{
                height: "5rem",
                float: "right",
                backgroundColor: "#89c03f",
              }}
              onClick={() => addHandler("user._id")}
            >
              Add User
            </button>
          </div>
          <div className="row fit top">
            {/* <div className="col-3 ">
              <img
                src={homeimg}
                alt=""
                width="90%"
                style={{ margin: "1.5% auto" }}
              />
            </div> */}
            <div className="col-1 top">
              {/* <h1>Users</h1> */}
              <table className="table">
                <thead style={{ borderBottom: "2px solid #17202e" }}>
                  <tr>
                    <th
                      style={{
                        borderRight: "2px solid #17202e",
                        padding: "1.5%",
                      }}
                    >
                      ID
                    </th>
                    <th style={{ borderRight: "2px solid #17202e" }}>NAME</th>
                    <th style={{ borderRight: "2px solid #17202e" }}>EMAIL</th>
                    <th style={{ borderRight: "2px solid #17202e" }}>ADMIN</th>
                    <th style={{ width: "240px" }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? "Yes" : "No"}</td>
                        <td>
                          <button
                            style={{
                              backgroundColor: "yellow",
                              height: "65px",
                              width: "60px",
                              color: "black",
                            }}
                            onClick={() => permissionHandler(user._id)}
                          >
                            <FontAwesomeIcon icon={faLock} />
                          </button>
                          <button
                            style={{
                              backgroundColor: "dark",
                              height: "65px",
                              width: "60px",
                            }}
                            onClick={() => passwordHandler(user._id)}
                          >
                            <FontAwesomeIcon icon={faKey} />
                          </button>
                          <button
                            style={{
                              backgroundColor: "gray",
                              height: "65px",
                              width: "60px",
                            }}
                            onClick={() => editHandler(user._id)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            style={{
                              backgroundColor: "#ee4035",
                              height: "65px",
                              width: "60px",
                            }}
                            onClick={() => deleteHandler(user._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
