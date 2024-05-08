const express = require("express");
const router = express.Router();
const {
  createVarmala,
  deleteVarmala,
  updateVarmala,
  getAllVarmala,
} = require("../controllers/varmalaController");

router.post("/create-varmala", createVarmala);

router.post("/delete-varmala", deleteVarmala);

router.post("/update-varmala", updateVarmala);

router.get("/get-all-varmala", getAllVarmala);

module.exports = router;
