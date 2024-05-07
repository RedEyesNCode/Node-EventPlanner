const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");
const {
  createTravel,
  deleteTravel,
  updateTravel,
  getAllTravel
} = require("../controllers/travelController");

router.post("/create-travel", createTravel);

router.post("/delete-travel", deleteTravel);

router.post("/update-travel", updateTravel);

router.get("/get-all-travel", getAllTravel);


module.exports = router;
