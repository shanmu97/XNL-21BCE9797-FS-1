import axios from "axios";

const API_URL = "http://localhost:5002/transaction/";

const getAuthConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const createTransaction = async (transactionData, token) => {
  try {
    if (!token) throw new Error("Unauthorized: Token is missing.");
    console.log(transactionData)
    const response = await axios.post(API_URL, transactionData, getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error("Transaction Error:", error);
    throw new Error(error.response?.data?.message || "Failed to process transaction.");
  }
};

const getUserTransactions = async (token) => {
  try {
    if (!token) throw new Error("Unauthorized: Token is missing.");

    const response = await axios.get(API_URL+'user', getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error("Fetch Transactions Error:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch transactions.");
  }
};

const transactionService = { createTransaction, getUserTransactions };

export default transactionService;
