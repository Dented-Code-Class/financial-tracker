import express from "express";
import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import {
  createUser,
  getUserDetail,
  loginUser,
} from "./src/controllers/userControllers.js";
import {
  createTransaction,
  deleteTransaction,
  deleteTransactions,
  getDashboardSummary,
  getTransaction,
  updateTransaction,
} from "./src/controllers/transactionControllers.js";
import { auth } from "./src/middlewares/authMiddleware.js";

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/finance-tracking";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send({
    status: "success",
    message: "Financial Tracker API",
  });
});

//User Register
app.post("/api/v1/auth/register", createUser);

// login api
app.post("/api/v1/auth/login", loginUser);

// get user detail
app.get("/api/v1/users", auth, getUserDetail);

//Create Transaction
app.post("/api/v1/transactions", auth, createTransaction);

//Get Transaction
app.get("/api/v1/transactions", auth, getTransaction);

//Update Transaction
app.patch("/api/v1/transactions/:id", auth, updateTransaction);

//Delete Transaction by ID
app.delete("/api/v1/transactions/:id", auth, deleteTransaction);

//Delete Transaction by IDs
app.delete("/api/v1/transactions", auth, deleteTransactions);

//Dashboard summary
app.get("/api/v1/dashboard", auth, getDashboardSummary);

mongoose
  .connect(MONGO_URL) // MONGOURL --> Connection string
  .then(() => {
    console.log("MONGO CONNECTED", MONGO_URL);
    app.listen(PORT, (error) => {
      if (error) {
        console.log(error);
        console.log("SERVER did not start!");
      } else {
        console.log("Server started at PORT: ", PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("ERROR MONGO");
  });
