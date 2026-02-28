import express from "express";
import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/finance-tracking";

app.use(express.json());
app.use(cors());

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
