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
