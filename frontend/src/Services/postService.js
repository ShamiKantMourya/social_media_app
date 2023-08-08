import axios from "axios";

export const getFollowingPost = () => async (dispatch) => {
    try {
        dispatch({
            type: "postOfFollowingRequest",
        });

        const response = await axios.get("/api/v1/followingPosts");
        dispatch({
            type: "postOfFollowingSuccess",
            payload: response.data.posts,
        });

    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message,
        })
    }
};

export const updateLike = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest",
        })

        const response = await axios.get(`/api/v1/post/${id}`);

        dispatch({
            type: "likeSuccess",
            payload: response.data.message,
        })

    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message,
        })
    }
};

export const addPostComment = (id, comment) => async (dispatch) => {
    try {

        dispatch({
            type: "commentRequest",
        });

        const response = await axios.put(`/api/v1/post/comment/${id}`, {
            comment
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "commentSuccess",
            payload: response.data.message,
        })

    } catch (error) {
        dispatch({
            type: "commentFailure",
            payload: error.response.data.message,
        });

    }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
    try {

        dispatch({
            type: "deleteCommentRequest"
        });

        const response = await axios.delete(`/api/v1/post/comment/${id}`, {
            data: {commentId},
        });

        dispatch({
            type: "deleteCommentSuccess",
            payload: response.data.message,
        })

    } catch (error) {
        dispatch({
            type: "deleteCommentFailure",
            payload: error.response.data.message,
        })
    }
};

export const userPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "myPostRequest",
        });

        const response = await axios.get("/api/v1/my/posts");

        console.log(response.data);

        dispatch({
            type: "myPostSuccess",
            payload: response.data.posts,
        })
    } catch (error) {
        dispatch({
            type: "myPostFailure",
            payload: error.response.data.message,
        })
    }
};

export const createPost = (caption, image, location) => async (dispatch) => {
    try {
        dispatch({
            type: "createPostRequest",
        });

        const response = await axios.post("/api/v1/post/createpost", {
            caption,
            image,
            location,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: 'createPostSuccess',
            payload: response.data.message,
        })
    } catch (error) {
        dispatch({
            type: "createPostFailure",
            payload: error.response.data.message,
        })
    }
};

export const updateCaption = (caption, id) => async (dispatch) => {
    try {
        dispatch({
            type: "updateCaptionRequest",
        })

        const response = await axios.put(`/api/v1/post/${id}`, {
            caption
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "updateCaptionSuccess",
            payload: response.data.message,
        });

    } catch (error) {
        dispatch({
            type: "updateCaptionFailure",
            payload: error.response.data.message,
        })
    }
};

export const deleteUserPost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deletePostRequest",
        });

        const response = await axios.delete(`/api/v1/post/${id}`);
        dispatch({
            type: "deletePostSuccess",
            payload: response.data.message,
        })
    } catch (error) {
        dispatch({
            type: "deletePostFailure",
            payload: error.response.data.message,
        })
    }
};

export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userPostRequest",
        });

        const response = await axios.get(`/api/v1/post/userPost/${id}`);
        console.log(response.data, "getuserPosts")
        dispatch({
            type: "userPostSuccess",
            payload: response.data.posts,
        })

    } catch (error) {
        dispatch({
            type: "userPostFailure",
            payload: error.response.data.message,
        })
    }
};