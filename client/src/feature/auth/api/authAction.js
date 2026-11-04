import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "./authApi";

export const registerAction = createAsyncThunk(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await register(credentials);
            console.log("Register Action Data:", data);
            return data;
            
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const loginAction = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await login(credentials);
            console.log("Login Action Data:", data);
            return data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }

    })