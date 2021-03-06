import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";

import "./Navbar.scss";

const button = (history, authUid, dispatch, userName) => {
	switch (history.location.pathname) {
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
							dispatch(logoutUser(history));
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
	const history = useHistory();
	const dispatch = useDispatch();
	const authUid = useSelector(state => state.firebase.auth.uid);
	const userName = useSelector(state => state.firebase.profile.username);

	return (
		<div className="navbar-container">
			<div className="wrapper">
				<Link to="/">
					<div className="logo">Feeder</div>
				</Link>
				{button(history, authUid, dispatch, userName)}
			</div>
		</div>
	);
};

export default Navbar;
