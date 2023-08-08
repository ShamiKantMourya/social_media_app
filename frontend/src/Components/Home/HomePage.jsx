import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

import "./HomePage.css";
import User from "../User/User";
import Post from "../Post/Post";
import { getFollowingPost } from "../../Services/postService";
import { getAllUsers } from "../../Services/userService";
import Loader from "../Loader/Loader";
// import CreatePost from '../CreatePost/CreatePost';

const HomePage = () => {
  const dispatch = useDispatch();

  const { loading, post, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, loading: userLoading } = useSelector(
    (state) => state.allUsersData
  );
  const { error: likeError, message } = useSelector((state) => state.like);
  const { error: commentError, message: commentMssg } = useSelector(
    (state) => state.comment
  );

  const alert = useAlert();

  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUsers());
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
  }, [alert, likeError, error, message, commentMssg,commentError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="home-container">
      {/* Post Area */}
      <div className="home-post-area">
        {/* <CreatePost /> */}
        {post && post.length > 0 ? (
          post.map((posts) => (
            <Post
              key={posts._id}
              postId={posts._id}
              caption={posts.caption}
              location={posts.location}
              postImage={posts.image.url}
              likes={posts.likes}
              comments={posts.comments}
              ownerImage={posts.owner.avatar.url}
              ownerName={posts.owner.name}
              ownerId={posts.owner._id}
              isUserAccount={"home"} //newly added into home
            />
          ))
        ) : (
          <Typography variant="h6">No posts Available</Typography>
        )}
      </div>

      {/* //Friend List Area */}
      <div className="home-friends-area">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div className="user-profile-area">
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
          <Typography>No users found</Typography>
        )}
      </div>
    </div>
  );
};

export default HomePage;
