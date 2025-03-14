const express = require("express");
const { createTransaction,getUserTransactions } = require("../Controller/transactionController");
const {authMiddleware} = require("../../UserService/Middleware/authMiddleWare");

const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/user", authMiddleware, getUserTransactions);

module.exports = router;
