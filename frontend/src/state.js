import { configureStore } from "@reduxjs/toolkit";
import { allUserReducer, followUserReducer, updateProfileReducer, userProfileReducer, userReducer } from "./Reducers/userReducer";
import {
    commentReducer,
    createPostReducer,
    likeReducer,    
    myPostReducer,
    postReducer,
    userPostReducer
} from "./Reducers/postReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postReducer,
        allUsersData: allUserReducer,
        like: likeReducer,
        comment: commentReducer,
        myPost: myPostReducer,
        createPost: createPostReducer,
        updateProfile: updateProfileReducer,
        userPost: userPostReducer,
        userProfile: userProfileReducer,
        followUser: followUserReducer,
    }
});

export default store;