import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const postReducer = createReducer(initialState, {
    postOfFollowingRequest: (state) => {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});

export const likeReducer = createReducer(initialState, {

    likeRequest: (state) => {
        state.loading = true;
    },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
});

export const commentReducer = createReducer(initialState, {

    commentRequest: (state) => {
        state.loading = true;
    },

    commentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    commentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteCommentRequest: (state) => {
        state.loading = true;
    },

    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    deleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },

    clearMessage: (state) => {
        state.message = null;
    }
});

export const myPostReducer = createReducer(initialState, {

    myPostRequest: (state) => {
        state.loading = true;
    },

    myPostSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },

    myPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
}); 

export const createPostReducer = createReducer(initialState, {
    createPostRequest: (state) => {
        state.loading = true;
    },

    createPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    createPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateCaptionRequest: (state) => {
        state.loading = true;
    },

    updateCaptionSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    updateCaptionFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deletePostRequest: (state) => {
        state.loading = true;
    },

    deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },

    deletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },

    clearMessage: (state) => {
        state.message = null;
    }
});

export const userPostReducer = createReducer(initialState,{
    userPostRequest: (state) => {
        state.loading = true;
    },

    userPostSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },

    userPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
})