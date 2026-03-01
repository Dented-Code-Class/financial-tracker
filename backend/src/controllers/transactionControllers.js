import { Transaction } from "../models/transactionModel.js";

export const createTransaction = async (req, res) => {
  try {
    console.log(req.user);
    const newTransaction = req.body;
    // add user id from req.
    newTransaction.userId = req.user._id;

    const data = await Transaction.insertOne(newTransaction);
    return res.send({
      status: "success",
      messgae: "Transaction added succesfully",
      Transaction: data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error Adding Transactionr",
    });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    return res.send({
      status: "success",
      message: "Transaction found",
      transactions,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error getting transaction",
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const updatedPayload = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: transactionId,
        userId: req.user._id,
      },
      updatedPayload,
      {
        new: true,
      },
    );
    return res.send({
      status: "success",
      message: "Update successful",
      transaction,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error updating transaction",
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const trasactionId = req.params.id;
    const data = await Transaction.deleteOne({
      _id: trasactionId,
      userId: req.user._id,
    });
    return res.send({
      status: "success",
      message: "Delete transaction successful",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "Error deleting transaction",
    });
  }
};

export const deleteTransactions = async (req, res) => {
  try {
    const transactionIds = req.body.ids;
    let data = await Transaction.deleteMany({
      _id: { $in: transactionIds },
      userId: req.user._id,
    });
    return res.send({
      status: "success",
      message: "selected transaction deleted",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: "error deleting transactions",
    });
  }
};
