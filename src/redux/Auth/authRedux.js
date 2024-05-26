import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: false,
  message: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_FAIL: (state, action) => {
      state.user = null;
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.error = false;
      state.loading = false;
    },
    LOGOUT: (state, action) => {
      state.user = null;
      state.error = false;
      state.message = action.payload;
      state.loading = false;
    },
    TOGGLE_LOADING: (state) => {
      state.loading = !state.loading;
    },
    CLEAR_ERROR_MESSAGE: (state) => {
      state.error = false;
      state.message = "";
    },
    SIGNUP_FAIL: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },
    SIGNUP_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.error = false;
      state.loading = false;
    },
    SET_AUTH_USER: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const authReducers = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelector = (state) => state.authReducers;
