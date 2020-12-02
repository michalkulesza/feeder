import React, { useState } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userAction";

const Login = props => {
	const dispatch = useDispatch();
	const [login, setLogin] = useState({ email: "", password: "" });

	const handleChange = e => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(loginUser(login, props.history));
	};

	return (
		<div className="login container">
			<div className="login-form">
				<div className="form-title">Login</div>
				<form onSubmit={handleSubmit}>
					<div className="login-form-row">
						<label htmlFor="email">E-mail:</label>
						<input name="email" type="email" onChange={handleChange} />
					</div>
					<div className="login-form-row">
						<label htmlFor="password">Password:</label>
						<input name="password" type="password" onChange={handleChange} />
					</div>
					<div className="form-buttons-row">
						<button className="button">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
