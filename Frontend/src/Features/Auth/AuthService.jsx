import axios from "axios";

const API_URL = "https://xnl-21bce9797-fs-1.onrender.com/user";

const register = async (userData) => {
  const response = await axios.post(API_URL + "/register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "/login", userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
