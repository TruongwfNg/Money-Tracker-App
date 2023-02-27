const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Transaction = require("./model/Transaction");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/money-tracker").then(() => {
  console.log("DB connected");
});

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("Server test OK!");
});

app.post("/api/transaction", async (req, res) => {
  try {
    const { name, price, description, datetime } = req.body;
    const newTransaction = Transaction.create({
      name,
      price,
      description,
      datetime,
    });

    res.status(200).json(newTransaction);
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/getAllTransactions", async (req, res) => {
  try {
    const allTransaction = await Transaction.find().sort({ datetime: -1 });
    if (!allTransaction) {
      throw new Error("No Doc Found!");
    }

    res.status(200).json(allTransaction);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running...");
});
