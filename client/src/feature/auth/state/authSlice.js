import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  accessToken: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("auth/register/pending", (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.accessToken = null;
      })
      .addCase("auth/register/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase("auth/register/rejected", (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
      })
      .addCase("auth/login/pending", (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.accessToken = null;
      })
      .addCase("auth/login/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase("auth/login/rejected", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
      })
      .addCase("auth/initialize/pending", (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.initialized = false;
      })
      .addCase("auth/initialize/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.initialized = true;
      })
      .addCase("auth/initialize/rejected", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.initialized = true;
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { loginStart, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
