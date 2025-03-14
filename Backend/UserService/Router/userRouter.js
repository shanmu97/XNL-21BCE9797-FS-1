const express = require("express");
const {authMiddleware} = require("../Middleware/authMiddleWare");
const {registerUser,loginUser,getUserProfile}= require("../Controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware,getUserProfile);

module.exports = router;
