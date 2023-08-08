import React, { useEffect, useState } from 'react';
import {Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "./ForgetPassword.css";
import { forgetPassword } from '../../Services/userService';

const ForgetPassword = () => {

  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector((state) => state.updateProfile);

  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(forgetPassword(email));
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

  }, [dispatch, error, message, alert])

  return (
    <div className='forgetpassword'>
    <div className='forgetpassword-container'>
    <div className='forgetpassword-logo'>
     <Typography>
        Harmony_Of_Words
      </Typography>
     </div>
      <form className='forgetpassword-form' onSubmit={submitHandler}>
        <input
          type='email'
          required
          placeholder='enter your registered email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className='send-mail-btn'>
        <button disabled={loading} type='submit'>Send Email</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default ForgetPassword;