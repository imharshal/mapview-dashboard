import axios from "axios";
import AuthService from "./authService";
const _axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

_axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${AuthService.getToken()}`;
  return Promise.resolve(config);
});

const registerUser = async (userData) => {
  return await _axios.post("/register", userData);
};

const getProfile = async () => {
  return await _axios.get("/user");
};

const getMapCards = async () => {
  return await _axios.get("/mapcards");
};

const apiService = { registerUser, getProfile, getMapCards };

export default apiService;
