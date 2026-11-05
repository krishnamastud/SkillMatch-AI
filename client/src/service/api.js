import axios from "axios";
import { store } from './../app/store/store';

const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true,
})


// Add a request interceptor to include the token in the headers

api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default api;