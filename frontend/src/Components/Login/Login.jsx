import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Email, Https } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "./Login.css";
import { loginUser } from "../../Services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.updateProfile);

  const dispatch = useDispatch();
  const alert = useAlert();

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert,error, dispatch, message]);
  return (
    <div className="login-page-box">
      <div className="login-page">
        <div className="sign-in-text">
          <p className="sign-in">Sign In</p>
        </div>

        <form className="login-form" onSubmit={loginHandler}>
          <div className="input-email">
            <span className="input-icon">
              <Email />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="sign-in-input-field"
            />
          </div>
          <div className="input-password">
            <span className="input-icon">
              <Https />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="sign-in-input-field"
            />
          </div>
          <Link to="/forget/password">
            <p>forgot password?</p>
          </Link>
          <div className="login-button">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>

          <Link to="/register" className="sign-in-register">
            <p>New user? Sign Up</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
