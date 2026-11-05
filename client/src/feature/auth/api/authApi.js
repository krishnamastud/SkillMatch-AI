import api from "../../../service/api";

// API call to login a user
export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

// API call to register a new user
export const register = async (credentials) => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};

// API call to refresh the access token
export const refreshToken = async () => {
  const { data } = await api.post("/auth/refresh-token");
  return data;
}

export const getMe = async () => {
  const { data } = await api.get("/auth/get-me");
  return data;
}

export const googleOAuth = async () => {
  // forwarding the user to the Google OAuth 2.0 authentication page
  window.location.href = "http://localhost:3000/api/auth/google";
}