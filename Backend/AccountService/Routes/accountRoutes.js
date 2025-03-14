const express = require("express");
const { createAccount, getAccountDetails,updateAccountBalance} = require("../Controller/accountController");
const { authMiddleware } = require("../../UserService/Middleware/authMiddleWare");

const router = express.Router();

router.post("/", authMiddleware, createAccount);
router.get("/", authMiddleware, getAccountDetails);
router.put("/", authMiddleware, updateAccountBalance);

module.exports = router;
