import mongoose from "mongoose";
let transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  tDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

//User Model
export const Transaction = mongoose.model("Transaction", transactionSchema);
