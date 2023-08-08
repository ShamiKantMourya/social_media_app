import { createReducer } from "@reduxjs/toolkit";

const initialState = { };

export const userReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  registerRequest: (state) => {
    state.loading = true;
  },
  registerSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  registerFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  loadUserRequest: (state) => {
    state.loading = true;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  logoutRequest: (state) => {
    state.loading = true;
  },

  logoutSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },

  logoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});

export const allUserReducer = createReducer(initialState, {
  allUserRequest: (state) => {
    state.loading = true;
  },
  allUserSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const updateProfileReducer = createReducer(initialState, {
  updateProfileRequest: (state) => {
    state.loading = true;
  },

  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updatePasswordRequest: (state) => {
    state.loading = true;
  },

  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteProfileRequest: (state) => {
    state.loading = true;
  },

  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  deleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  forgetPasswordRequest: (state) => {
    state.loading = true;
  },

  forgetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  forgetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  resetPasswordRequest: (state) => {
    state.loading = true;
  },

  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  resetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});

export const userProfileReducer = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loading = true;
  },

  userProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },

  userProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});

export const followUserReducer = createReducer(initialState, {
  followUserRequest: (state) => {
    state.loading = true;
  },

  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },

  followUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },

  clearMessage: (state) => {
    state.message = null;
  },
});
