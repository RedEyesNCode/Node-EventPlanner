const express = require("express");
const router = express.Router();
const { createTransaction, deleteTransaction } = require("../controllers/transactionController");


router.post("/create-transaction", createTransaction);

router.post("/delete-transaction", deleteTransaction);

module.exports = router