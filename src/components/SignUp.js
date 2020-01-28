import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/userAction";

const SignUp = props => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    if (e.target.style.border === "1px solid red") {
      e.target.style.border = "none";
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    //Validation
    const username = e.target.querySelectorAll("[name=username]")[0];
    const email = e.target.querySelectorAll("[name=email]")[0];
    const password = e.target.querySelectorAll("[name=password]")[0];
    const confirmPassword = e.target.querySelectorAll("[name=confirmPassword]")[0];

    if (username.value === "") {
      username.placeholder = "Cannot be empty";
      username.style.border = "1px solid red";
    }
    if (email.value === "") {
      email.placeholder = "Cannot be empty";
      email.style.border = "1px solid red";
    }
    if (password.value === "") {
      password.placeholder = "Cannot be empty";
      password.style.border = "1px solid red";
    }

    if (confirmPassword.value === "") {
      confirmPassword.style.border = "1px solid red";
      confirmPassword.placeholder = "Cannot be empty";
    }

    if (password.value !== confirmPassword.value) {
      password.value = "";
      password.placeholder = "Passwords must be the same";
      password.style.border = "1px solid red";
      confirmPassword.value = "";
      confirmPassword.placeholder = "Passwords must be the same";
      confirmPassword.style.border = "1px solid red";
      return;
    }

    if (password.value.length < 6) {
      password.value = "";
      password.placeholder = "At least 6 characters";
      password.style.border = "1px solid red";
    }

    if (confirmPassword.value.length < 6) {
      confirmPassword.value = "";
      confirmPassword.placeholder = "At least 6 characters";
      confirmPassword.style.border = "1px solid red";
    }

    if (
      username.value !== "" &&
      email.value !== "" &&
      password.value.length >= 6 &&
      confirmPassword.value.length >= 6
    ) {
      dispatch(signupUser(user, props.history));
    } else {
      return;
    }
  };

  return (
    <div className="login container">
      <div className="login-form">
        <div className="form-title">Sign-up</div>
        <form onSubmit={handleSubmit}>
          <div className="login-form-row">
            <label htmlFor="username">Username:</label>
            <input name="username" type="text" onChange={handleChange} />
          </div>
          <div className="login-form-row">
            <label htmlFor="email">E-mail:</label>
            <input name="email" type="email" onChange={handleChange} />
          </div>
          <div className="login-form-row">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              onChange={handleChange}
            />
          </div>
          <div className="login-form-row">
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="At least 6 characters"
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons-row">
            <button className="button">Sign-up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
