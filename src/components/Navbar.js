import React from "react";
import "./Navbar.scss";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";

const button = (props, authUid, dispatch, userName) => {
  switch (props.location.pathname) {
    case "/signup":
      return (
        <Link to="/login">
          <div className="button">Login</div>
        </Link>
      );
    case "/login":
      return (
        <Link to="/signup">
          <div className="button">Signup</div>
        </Link>
      );
    default: {
      return authUid && userName ? (
        <>
          <Link to={`/user/${userName}`}>
            <span>{userName}</span>
          </Link>
          <div
            className="button red"
            onClick={() => {
              dispatch(logoutUser(props.history));
            }}
          >
            Logout
          </div>
        </>
      ) : (
        <Link to="/login">
          <div className="button">Login</div>
        </Link>
      );
    }
  }
};

const Navbar = props => {
  const authUid = useSelector(state => state.firebase.auth.uid);
  const userName = useSelector(state => state.firebase.profile.username);
  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      <div className="wrapper">
        <Link to="/">
          <div className="logo">Feeder</div>
        </Link>
        {button(props, authUid, dispatch, userName)}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
