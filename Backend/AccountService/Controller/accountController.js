const Account = require("../Model/AccountModel");
const axios = require("axios");

const createAccount = async (req, res) => {
  try {
    const { currency } = req.body;
    const userId = req.user.id;

    const existingAccount = await Account.findOne({ userId });
    if (existingAccount) return res.status(400).json({ message: "Account already exists" });

    const newAccount = new Account({ userId, balance: 0, currency });
    await newAccount.save();
    
    res.status(201).json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    res.status(500).json({ message: "Error creating account", error: error.message });
  }
};

const getAccountDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const account = await Account.findOne({ userId });

    if (!account) return res.status(404).json({ message: "Account not found" });

    const transactionServiceUrl = "http://localhost:5002/transaction/user";
    const response = await axios.get(transactionServiceUrl, {
      headers: { Authorization: req.headers.authorization },
    });

    res.status(200).json({ account, transactions: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching account details", error: error.message });
  }
};

const updateAccountBalance = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { balance } = req.body;

        if (balance === undefined) {
            console.log(" Balance is undefined");
            return res.status(400).json({ message: "Balance is required" });
        }

        const account = await Account.findOneAndUpdate(
            { userId },  
            { balance },  
            { new: true }
        );

        if (!account) {
            console.log(" Account not found for user:", userId);
            return res.status(404).json({ message: "Account not found" });
        }

        console.log(" Balance updated successfully:", account.balance);
        res.json(account);
    } catch (error) {
        console.error(" Failed to update balance:", error.message);
        res.status(500).json({ message: "Failed to update balance", error: error.message });
    }
};

module.exports = { updateAccountBalance };


module.exports = { createAccount, getAccountDetails,updateAccountBalance};
