import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {Delete} from "@mui/icons-material";

import { deleteComment, getFollowingPost, getUserPosts } from "../../Services/postService";
import { userPosts } from "../../Services/postService";
import "./CommentCard.css";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isUserAccount,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const params = useParams();

  const deleteCommentHandler = async () => {
    await dispatch(deleteComment(postId, commentId));

    if (isUserAccount === "account") {
      dispatch(userPosts());
    };
    // else {
    //   dispatch(getFollowingPost());
    //   dispatch(getUserPosts(params.id)) //newly added
    // }
    if (isUserAccount === "home") {
      dispatch(getFollowingPost());
    };
    if (isUserAccount === "user") {
      dispatch(getUserPosts(params.id));
    }
  };

  return (
    <div className="user-comment-box">
      <div className="avatar-name-comment">
        <div className="avatar-comment-card">
          <Link to={`/user/${userId}`}>
            <Avatar src={avatar} alt={name} />
          </Link>
        </div>
        <div className="name-comment-card">
          <Link to={`/user/${userId}`}>
            <p className="commentcard-name">{name}</p>
          </Link>
          <div className="comment-delete">
          <p className="commentcard-comment">{comment}</p>
          <div className="edit-reply-delete-comment">
        {isUserAccount === "account" ? (
          <button onClick={deleteCommentHandler}><Delete /></button>
        ) : userId === user._id ? (
          <button onClick={deleteCommentHandler}><Delete /></button>
        ) : null}
      </div>
          </div>
         
        </div>
      </div>
    
    </div>
  );
};

export default CommentCard;
