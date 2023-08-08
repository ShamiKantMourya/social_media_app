import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { useAlert } from "react-alert";

import "./userAccount.css";
import { userPosts } from "../../Services/postService";
import { deleteUserProfile, logoutUser } from "../../Services/userService";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserAccount = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, posts } = useSelector((state) => state.myPost);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading: deleteProfileLoading } = useSelector(
    (state) => state.updateProfile
  );
  const { error: likeError, message } = useSelector((state) => state.like);
  const { error: commentError, message: commentMssg } = useSelector(
    (state) => state.comment
  );

  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  console.log(posts);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logout successfully");
  };

  const deleteprofile = async () => {
    await dispatch(deleteUserProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(userPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (commentError) {
      alert.error(commentError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (commentMssg) {
      alert.success(commentMssg);
      dispatch({ type: "clearmessage" });
    }
  }, [dispatch, error,likeError, message, commentError, commentMssg,alert]);
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="user-account">
      <div className="user-post-section">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              location={post.location}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isUserAccount={"account"} //change true into account
              isDelete={true}
            />
          ))
        ) : (
          <p className="no-post-text">No Posts</p>
        )}
      </div>
      <div className="user-profile-section">
        <div className="user-profile-container">
          <div className="user-profile-avatar">
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />
          </div>
          <p className="user-Profile-name">{user.name}</p>
          <Link to="/update/profile" className="user-Profile-editLink">
            Edit profile
          </Link>
          <div className="followunFollow">
            <div className="user-followers">
              <button
                className="user-profile-follow"
                onClick={() => setFollowerToggle(!followerToggle)}
              >
                followers
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>
            <div className="user-followers">
              <button
                className="user-profile-follow"
                onClick={() => setFollowingToggle(!followingToggle)}
              >
                following
              </button>
              <Typography>{user.following.length}</Typography>
            </div>
          </div>

          <div className="user-post">
            <Typography> Post</Typography>
            <Typography sx={{ marginLeft: "15px" }}>
              {user.posts.length}
            </Typography>
          </div>
          <div className="logout-btn">
            <button onClick={logoutHandler}>Logout</button>
          </div>
          <div className="user-change-password">
            <Link to="/update/password" className="change-password-text">
              Change password
            </Link>
          </div>
          <div className="delete-my-profile">
            <Button
              variant="text"
              onClick={deleteprofile}
              disabled={deleteProfileLoading}
              style={{ color: "red", margin: "2vmax" }}
            >
              Delete My Profile
            </Button>
          </div>
        </div>
        <Dialog
          open={followerToggle}
          onClose={() => setFollowerToggle(!followerToggle)}
        >
          <div className="dialog-box">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((user) => (
                <div className="user-follow-data">
                  <User
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    location={user.location}
                    avatar={user.avatar.url}
                  />
                </div>
              ))
            ) : (
              <Typography>You have no followers</Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="dialog-box">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((user) => (
                <div className="user-follow-data">
                  <User
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    location={user.location}
                    avatar={user.avatar.url}
                  />
                </div>
              ))
            ) : (
              <Typography>Follow someone first</Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserAccount;
