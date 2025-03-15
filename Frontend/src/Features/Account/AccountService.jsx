import axios from "axios";

const API_URL = "http://localhost:5003/account/";

const createAccount = async (accountData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(API_URL, accountData, config);
  return response.data;
};

const getAccountDetails = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL, config);
  console.log(response.data)
  return response.data;
};

const updateAccountBalance = async (balance, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(API_URL, { balance }, config);
  return response.data;
};

const accountService = {
  createAccount,
  getAccountDetails,
  updateAccountBalance,
};

export default accountService;
