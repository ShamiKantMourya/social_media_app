import axios from "axios";


export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginRequest",
        });

        const response = await axios.post("/api/v1/login", { email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch({
            type: "loginSuccess",
            payload: response.data.user,
        });

    } catch (error) {
        dispatch({
            type: "loginFailure",
            payload: error.response.data.message,
        });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest",
        });

        await axios.get("/api/v1/logout")

        dispatch({
            type: "logoutSuccess",
        });
    } catch (error) {
        dispatch({
            type: "logoutFailure",
            payload: error.response.data.message,
        });
    }
};


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest",
        });

        const response = await axios.get("/api/v1/profile/myProfile");

        // console.log(response.data.user);
        dispatch({
            type: "loadUserSuccess",
            payload: response.data.user,
        });

    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        });
    }
};

export const getAllUsers = (name = "") => async (dispatch) => {
    try {

        dispatch({
            type: "allUserRequest",
        })

        const response = await axios.get(`/api/v1/all/usersProfile?name=${name}`);

        dispatch({
            type: "allUserSuccess",
            payload: response.data.users,
        })

    } catch (error) {
        dispatch({
            type: "allUserFailure",
            payload: error.response.data.message,
        })
    }
};

export const registerUser = (avatar, name, location, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest",
        });

        const response = await axios.post('/api/v1/register', {
            avatar, name, location, email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        dispatch({
            type: "registerSuccess",
            payload: response.data.user,
        })

    } catch (error) {
        dispatch({
            type: "registerFailure",
            payload: error.response.data.message,
        })
    }
};

export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        });

        const response = await axios.put("/api/v1/update/profile", {
            name, email, avatar
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        // console.log(response.data);
        dispatch({
            type: "updateProfileSuccess",
            payload: response.data.message,
        })
    } catch (error) {
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        })
    }
};

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
try {
    dispatch({
        type: "updatePasswordRequest",
    });

    const response = await axios.put("/api/v1/update/password", {
        oldPassword, newPassword
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    dispatch({
        type: "updatePasswordSuccess",
        payload: response.data.message,
    })
    
} catch (error) {
    dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
    })
}
};

export const deleteUserProfile = () => async (dispatch) => {
try {
dispatch({
    type: 'deleteProfileRequest',
});

const response = await axios.delete("/api/v1/delete/profile");

dispatch({
    type: "deleteProfileSuccess",
    payload: response.data.message,
})
} catch (error) {
    dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
    })
}
};

export const forgetPassword = (email) => async (dispatch) => {
try {
    dispatch({
        type: "forgetPasswordRequest",
    });

    const response = await axios.post("/api/v1/forget/password",{
        email
    },{
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch({
        type: "forgetPasswordSuccess",
        payload: response.data.message,
    });
    
} catch (error) {
    dispatch({
        type: "forgetPasswordFailure",
        payload: error.response.data.message,
    })
}
};

export const resetPassword = (token,password) => async (dispatch) => {
try {
    dispatch({
        type: "resetPasswordRequest",
    });

    const response = await axios.put(`/api/v1/password/reset/${token}`,{
        password
    },{
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch({
        type: "resetPasswordSuccess",
        payload: response.data.message,
    })
    
} catch (error) {
    dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
    })
}
};

export const getUserProfiles = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userProfileRequest",
        });

        const response = await axios.get(`/api/v1/user/${id}`);

        // console.log(response.data);

        dispatch({
            type: "userProfileSuccess",
            payload: response.data.user,
        })

    } catch (error) {
        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message,
        })
    }
};

export const followAndUnfollowUserProfile = (id) => async (dispatch) => {
try {
    dispatch({
        type: "followUserRequest",
    });

    const response = await axios.get(`/api/v1/follow/${id}`);

    dispatch({
        type: "followUserSuccess",
        payload: response.data.message,
    })
    
} catch (error) {
    dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
    })
}
};