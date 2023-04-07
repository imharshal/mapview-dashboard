import axios from "axios";

const login = async (data) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/login`, data);
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const authService = { login, getToken };

export default authService;
