import React, { useEffect, useState } from "react";
import { Typography, Dialog } from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import User from "../User/User";
import {
  addPostComment,
  getFollowingPost,
  updateCaption,
  updateLike,
  userPosts,
  deleteUserPost,
  getUserPosts,
} from "../../Services/postService";
import { loadUser } from "../../Services/userService";
import CommentCard from "../comment/CommentCard";
import "./Post.css";
import { useParams } from "react-router";

const Post = ({
  postId,
  caption,
  location,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isUserAccount = "home", // change false into home
}) => {
  const [like, setLike] = useState(false);
  const [liked, setLiked] = useState(false);
  const [userComments, setUserComments] = useState("");
  const [toggleComment, setToggleComment] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [toggleCaption, setToggleCaption] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.user);

  // console.log(typeof (user._id), user._id);
  const handleLike = async () => {
    setLike(!like);
    await dispatch(updateLike(postId));

    if (isUserAccount === "account") {
      dispatch(userPosts());
    }; 
    if (isUserAccount === "home") {
      dispatch(getFollowingPost());
    };
    if (isUserAccount === "user") {
      dispatch(getUserPosts(params.id));
    }
    // if (isUserAccount) {
    //   dispatch(userPosts());
    // } else {
    //   dispatch(getFollowingPost());
    //   dispatch(getUserPosts(params.id)) //newly added
    // }
  };

  const addComment = async (event) => {
    event.preventDefault();

    await dispatch(addPostComment(postId, userComments));

    if (isUserAccount === "account") {
      dispatch(userPosts());
    }; 
    if (isUserAccount === "home") {
      dispatch(getFollowingPost());
    };
    if (isUserAccount === "user") {
      dispatch(getUserPosts(params.id));
    }
    // if (isUserAccount) {
    //   dispatch(userPosts());
    // } else {
    //   dispatch(getFollowingPost());
    //   dispatch(getUserPosts(params.id))
    // }
  };

  const updateCaptionHandler = (event) => {
    event.preventDefault();
    dispatch(updateCaption(captionValue, postId));
    dispatch(userPosts());
    dispatch(getUserPosts(params.id));
  };

  const deletePostHandler = async () => {
    await dispatch(deleteUserPost(postId));
    dispatch(userPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      // console.log(item._id);
      if (item._id === user._id) {
        setLike(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post-container">
      <div className="user-detail-edit-option">
        <div className="user-detail">
          <User
            userId={ownerId}
            name={ownerName}
            location={location}
            avatar={ownerImage}
          />
        </div>
        <div className="edit-option">
          {isUserAccount ? (
            <button onClick={() => setToggleCaption(!toggleCaption)}>
              <MoreVert />
            </button>
          ) : null}
        </div>
      </div>
      <div className="post-caption">
        <p className="caption">{caption}</p>
      </div>
      <div className="post-image">
        <img src={postImage} alt="Post" />
      </div>
      <div className="like-comment">
        <button
          className="like-btn"
          onClick={() => setLiked(!liked)}
          disabled={likes.length === 0 ? true : false}
        >
          <Typography>{likes.length} likes</Typography>
        </button>
        <Typography className="comment-btn">
          {comments.length}Comments
        </Typography>
      </div>
      <div className="like-comment-delete">
        <div className="like-comment-button">
          <button className="like-option" onClick={handleLike}>
            {like ? <Favorite /> : <FavoriteBorder />}
          </button>
          <button
            className="comment-option"
            onClick={() => setToggleComment(!toggleComment)}
          >
            <ChatBubbleOutline />
          </button>
        </div>
        {isDelete ? (
          <button className="delete-option" onClick={deletePostHandler}>
            {" "}
            <DeleteOutline />{" "}
          </button>
        ) : null}
      </div>
      <Dialog open={liked} onClose={() => setLiked(!liked)}>
        <div className="dialog-box">
          <Typography variant="h5">Liked By</Typography>
          {likes?.map((user) => (
            <div className="like-user">
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                location={user.location}
                avatar={user.avatar.url}
              />
            </div>
          ))}
        </div>
      </Dialog>

      <Dialog
        open={toggleComment}
        onClose={() => setToggleComment(!toggleComment)}
      >
        <div className="dialog-box">
          <Typography variant="h5">Comments</Typography>
          <form className="comment-box" onSubmit={addComment}>
            <input
              type="text"
              placeholder="Add your comment"
              value={userComments}
              onChange={(event) => setUserComments(event.target.value)}
              required
              className="add-comment-input"
            />
            <button
              type="submit"
              variant="contained"
              className="add-comment-btn"
            >
              Add
            </button>
          </form>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="post-comment-card">
                <CommentCard
                  key={comment._id}
                  userId={comment.user._id}
                  name={comment.user.name}
                  avatar={comment.user.avatar.url}
                  comment={comment.comment}
                  commentId={comment._id}
                  postId={postId}
                  isUserAccount={isUserAccount}
                />
              </div>
            ))
          ) : (
            <p className="no-comments-txt">No comments</p>
          )}
        </div>
      </Dialog>

      <Dialog
        open={toggleCaption}
        onClose={() => setToggleCaption(!toggleCaption)}
      >
        <div className="dialog-box">
          <Typography variant="h5">Edit Caption</Typography>
          <form className="comment-box" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              placeholder="Caption...."
              value={captionValue}
              onChange={(event) => setCaptionValue(event.target.value)}
              required
              className="add-comment-input"
            />
            <button
              type="submit"
              variant="contained"
              className="update-cation-btn"
            >
              Update
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
