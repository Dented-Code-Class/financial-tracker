import express from "express";
import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import { createUser } from "./src/controllers/userControllers.js";
import {
  createTransaction,
  deleteTransaction,
  deleteTransactions,
  getTransaction,
  updateTransaction,
} from "./src/controllers/transactionControllers.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/finance-tracking";

app.use(express.json());
app.use(cors());

//User Register
app.post("/api/v1/auth/register", createUser);

//Create Transaction
app.post("/api/v1/transactions", createTransaction);

//Get Transaction
app.get("/api/v1/transactions", getTransaction);

//Update Transaction
app.patch("/api/v1/transactions/:id", updateTransaction);

//Delete Transaction by ID
app.delete("/api/v1/transactions/:id", deleteTransaction);

//Delete Transaction by IDs
app.delete("/api/v1/transactions", deleteTransactions);

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
