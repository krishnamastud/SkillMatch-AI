import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMe, login, refreshToken, register } from "../api/authApi";
import { setAccessToken } from "./authSlice";
import { toast } from "react-toastify";

export const registerAction = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await register(credentials);
      console.log("Register Action Data:", data);
      toast.success("Registration successful");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  },
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      console.log("Login Action Data:", data);

      toast.success("Login successful");

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
);

export const initializeAaction = createAsyncThunk(
  "auth/initialize",
  async (_, thunkAPI) => {
    try {
      const refreshTokenRes = await refreshToken();
      thunkAPI.dispatch(setAccessToken(refreshTokenRes.accessToken));

      const meRes = await getMe();

      return {
        user: meRes.data.user,
        accessToken: refreshTokenRes.accessToken,
      };
    } catch (error) {
      toast.error(error.response?.data?.message || "Initialization failed");
    }
  },
);
