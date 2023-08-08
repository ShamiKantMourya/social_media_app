const express = require("express");

const {
    createPost,
    likeUnlikePost,
    deletePost,
    getFollowingPost,
    updateCaption,
    makeComments,
    deleteComment,
    getUserPost
} = require("../controllers/post");

const {getMyPosts} = require("../controllers/userProfile")
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

//Create, Update, Delete and Likeunlike Post
router.route("/followingPosts").get(isAuthenticated, getFollowingPost);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router.route("/post/userPost/:id").get(isAuthenticated, getUserPost); //change in route

router.route("/post/createpost").post(isAuthenticated, createPost);


router.route("/post/:id").get(isAuthenticated, likeUnlikePost).put(isAuthenticated, updateCaption).delete(isAuthenticated, deletePost); //change in route


//Update, Add, Delete comment

router.route("/post/comment/:id").put(isAuthenticated, makeComments).delete(isAuthenticated, deleteComment); //change in route

module.exports = router;