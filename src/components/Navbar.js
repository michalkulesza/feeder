import React from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userAction";

const button = (props, authenticated, dispatch, userName) => {
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
      return authenticated ? (
        <>
          <span>{userName && userName}</span>
          <div
            className="button"
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
  const authenticated = useSelector(state => state.user.authenticated);
  const userName = useSelector(state => state.firebase.profile.username);
  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      <div className="wrapper">
        <Link to="/">
          <div className="logo">Feeder</div>
        </Link>
        {button(props, authenticated, dispatch, userName)}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
