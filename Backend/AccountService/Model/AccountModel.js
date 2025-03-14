const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true, default: "INR" },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
