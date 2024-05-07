const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");

const {
  createTentHouse,
  getAllTentHouse,
  deleteTentHouse,
  updateTentHouse,
  uploadTentImage
} = require("../controllers/tentHouseControllers");

router.get("/get-all-tenthouse", getAllTentHouse);

router.post("/create-tent-house", createTentHouse);

router.post("/delete-tent-house", deleteTentHouse);

router.post("/update-tent-house", updateTentHouse);

router.post("/upload-tent-image",uploadMiddleWare.single("file") ,uploadTentImage);

module.exports = router; 
