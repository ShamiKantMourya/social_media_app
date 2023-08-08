import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import "./UpdateProfile.css";
import { loadUser, updateUserProfile } from "../../Services/userService";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {
  const {
    user,
    loading: checkLoading,
    error,
  } = useSelector((state) => state.user);
  const {
    message,
    loading,
    error: updateError,
  } = useSelector((state) => state.updateProfile);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = async (event) => {
    event.preventDefault();
    await dispatch(updateUserProfile(name, email, avatar));
    dispatch(loadUser());
  };

  const imageUpdateHandler = (event) => {
    const file = event.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPreview(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, updateError, message]);

  return checkLoading ? (
    <Loader />
  ) : (
    <div className="update-profile">
      <div className="update-profile-container">
        <form className="update-profile-form" onSubmit={submitHandler}>
          <h4 className="update-profile-text">Edit Profile</h4>
          <div className="update-profile-avatar-box">
            <Avatar
              src={avatarPreview}
              alt="UserProfile"
              className="update-profile-avatar"
              sx={{ height: "8vmax", width: "8vmax" }}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="input-file-area"
            onChange={imageUpdateHandler}
          />
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            className="input-text-area"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Name"
            required
            value={email}
            className="input-email-area"
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            type="submit"
            className="update-profile-button"
            disabled={loading}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
