import React, { useEffect, useState } from 'react';
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

import "./ResetPassword.css";
import { resetPassword } from '../../Services/userService';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { error, message, loading } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" })
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" })
    }

  }, [dispatch, error, message, alert]);

  return (
    <div className='resetPassword'>
     <div className='reset-password-container'>
     <div className='typography'>
     <p className='typography-text'>Harmony_Of_Words</p>
     </div>

<form className='resetPassword-form' onSubmit={submitHandler}>
  <input
    type='password'
    placeholder='New Password'
    value={password}
    required
    onChange={(event) => setPassword(event.target.value)}
  />
  <input
    type='password'
    placeholder='Confirm Password'
    value={confirmPassword}
    required
    onChange={(event) => setConfirmPassword(event.target.value)}
  />

 <div className='reset-password-button'>
 <button type='submit' disabled={loading || password !== confirmPassword}>Reset Password</button>
 </div>
  <div className='login-resend-link'>
    <Link to='/forget/password'><span className='resend-token-txt'>Resend</span></Link>
    <Link to='/'><span className='login-txt'>Login</span></Link>
  </div>
</form>
     </div>
    </div>
  )
}

export default ResetPassword;