import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    accessToken: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase("auth/register/pending", (state) => {
                state.loading = true;
                state.error = null;
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
                state.error = action.payload;
                state.isAuthenticated = false;
                state.accessToken = null;
            })
            .addCase("auth/login/pending", (state) => {
                state.loading = true;
                state.error = null;
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
                state.error = action.payload;
                state.isAuthenticated = false;
                state.accessToken = null;
            });
    }

})

export const { loginStart } = authSlice.actions;

export default authSlice.reducer;