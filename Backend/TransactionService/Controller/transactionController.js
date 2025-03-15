const Transaction = require("../Model/TransactionModel");
const axios = require("axios");
const {io} = require("../Server");


const getAccount = async (token) => {
    try {
        const response = await axios.get(`http://localhost:5003/account/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.account;
    } catch (error) {
        console.log("Error fetching account details:", error.response?.data || error.message);
        return null;
    }
};
const updateAccountBalance = async (token, newBalance) => {
    try {

        const response = await axios.put(
            "https://xnl-21bce9797-fs-1-2.onrender.com/account/",
            { balance: newBalance },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating balance:", error.response?.data || error.message);
        return null;
    }
};

const createTransaction = async (req, res) => {
    try {

        const { type, amount } = req.body;
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const account = await getAccount(token)
        if(!account){
            res.status(400).json({message:"Account not found!"})
        }
        let newBalance = Number(account.balance)
        console.log(typeof newBalance)
        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({ message: "Invalid amount", receivedAmount: amount });
        } 

        if (type === "deposit") {
            newBalance += numericAmount;
        } else if (type === "withdrawal") {
            newBalance -= numericAmount;
        }

        const transaction = new Transaction({ userId: req.user.id, type, amount: numericAmount, status: "completed" });
        await transaction.save();

        const updatedAccount = await updateAccountBalance(token, newBalance);

        if (!updatedAccount) {
            return res.status(500).json({ message: "Failed to update balance" });
        }

        if (io) {
            io.emit("transactionUpdate", { userId: req.user.id, type, amount: numericAmount, newBalance });
        } else {
            console.log("Socket.io instance is undefined!");
        }

        res.status(201).json(transaction);
    } catch (error) {
        console.error("Transaction error:", error);
        res.status(500).json({ message: "Transaction failed", error: error.message });
    }
};

const getUserTransactions = async (req, res) => {
    try {
      const userId = req.user.id;
      const transactions = await Transaction.find({ userId });
  
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching transactions", error: error.message });
    }
  };

module.exports = { createTransaction ,getUserTransactions};
