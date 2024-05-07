const express = require("express");
const router = express.Router();
const {
  createfunctionasevent,
  deletefunctionasevent,
  updatefunctionasevent,
  getAllfunctionasevent,
} = require("../controllers/functionController");

router.post("/create-function", createfunctionasevent);

router.post("/delete-function", deletefunctionasevent);

router.post("/update-function", updatefunctionasevent);

router.get("/get-all-function", getAllfunctionasevent);

module.exports = router;
