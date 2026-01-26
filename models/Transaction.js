const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  customerId: String,
  orderId: String,
  orderValue: Number,
  paymentMode: String,
  orderStatus: String,
  returnFlag: Boolean,
  exchangeFlag: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
