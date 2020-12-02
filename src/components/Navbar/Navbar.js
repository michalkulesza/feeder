import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";

import "./Navbar.scss";

const button = (location, authUid, dispatch, userName) => {
	switch (location.pathname) {
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
						<span id="nav-username">{userName}</span>
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

const Navbar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const authUid = useSelector(state => state.firebase.auth.uid);
	const userName = useSelector(state => state.firebase.profile.username);

	return (
		<div className="navbar-container">
			<div className="wrapper">
				<Link to="/">
					<div className="logo">Feeder</div>
				</Link>
				{button(location, authUid, dispatch, userName)}
			</div>
		</div>
	);
};

export default Navbar;
