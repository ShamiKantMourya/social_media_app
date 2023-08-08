import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import { getUserPosts } from "../../Services/postService";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import {
  followAndUnfollowUserProfile,
  getUserProfiles,
} from "../../Services/userService";
import "./UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, posts } = useSelector((state) => state.userPost);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const {
    message,
    error,
    loading: followLoading,
  } = useSelector((state) => state.followUser);
  const { user: myProfile } = useSelector((state) => state.user);
  const { error: likeError, message: likeMssg } = useSelector((state) => state.like);
  const { error: commentError, message: commentMssg } = useSelector(
    (state) => state.comment
  );

  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const alert = useAlert();

  console.log(posts, "user profile");

  const followUserHandler = async () => {
    setFollowing(!following);

    await dispatch(followAndUnfollowUserProfile(user._id));
    dispatch(getUserProfiles(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfiles(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (myProfile._id === params.id) {
      setUserProfile(true);
    }

    if (user) {
      user.followers.forEach((item) => {
        if (item._id === myProfile._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }

    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }

    if (userError) {
      alert.error(userError);
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
    if (likeMssg) {
      alert.success(likeMssg);
      dispatch({ type: "clearMessage" });
    }
    if (commentMssg) {
      alert.success(commentMssg);
      dispatch({ type: "clearmessage" });
    }
  }, [
    dispatch,
    alert,
    userError,
    message,
    error,
    user,
    myProfile._id,
    params.id,
    likeMssg,
    commentMssg,
    likeError,
    commentError
  ]);

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
              isUserAccount={"user"} //newly added and set value into user
            />
          ))
        ) : (
          <p className="no-post-text">No Posts</p>
        )}
      </div>
      <div className="user-profile-section">
        {user && (
          <div className="user-profile-container">
            <div className="user-profile-avatar">
              <Avatar
                src={user.avatar.url}
                sx={{ height: "8vmax", width: "8vmax" }}
              />
            </div>
            <p className="user-Profile-name">{user.name}</p>
            <div className="user-followers">
              <button onClick={() => setFollowerToggle(!followerToggle)}>
                followers
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>
            <div className="user-following">
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                following
              </button>
              <Typography>{user.following.length}</Typography>
            </div>
            <div className="user-post">
              <Typography> Post</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>
            <div className="user-profile-page-btn">
              {userProfile ? null : (
                <button
                  className="user-profile-follow-btn"
                  onClick={followUserHandler}
                  disabled={followLoading}
                >
                  {following ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
        )}
        <Dialog
          open={followerToggle}
          onClose={() => setFollowerToggle(!followerToggle)}
        >
          <div className="dialog-box">
            <Typography variant="h5">Followers</Typography>
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
            <Typography variant="h5">Following</Typography>
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

export default UserProfile;
