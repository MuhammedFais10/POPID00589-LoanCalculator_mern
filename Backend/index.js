// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/loanCalculator")
  .then((res) => {
    console.log(res, ": mongo Connected");
  })
  .catch((err) => {
    console.log(err, "Mongo error");
  });

const loanSchema = new mongoose.Schema({
  loanAmount: Number,
  interestRate: Number,
  yearsToRepay: Number,
  monthlyPayment: Number,
  totalPayment: Number,
  totalInterest: Number,
});

const Loan = mongoose.model("Loan", loanSchema);

app.post("/calculate", async (req, res) => {
  const { loanAmount, interestRate, yearsToRepay } = req.body;

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = yearsToRepay * 12;
  const monthlyPayment =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const loan = new Loan({
    loanAmount,
    interestRate,
    yearsToRepay,
    monthlyPayment,
    totalPayment,
    totalInterest,
  });

  await loan.save();
  res.json(loan);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
