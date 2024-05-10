const express = require("express");
const uploadMiddleWare = require("../utils/fileupload");
const router = express.Router();
const {
  createVarmala,
  deleteVarmala,
  updateVarmala,
  getAllVarmala,
  uploadVarmalaImage
} = require("../controllers/varmalaController");

router.post("/create-varmala", createVarmala);

router.post("/delete-varmala", deleteVarmala);

router.post("/update-varmala", updateVarmala);

router.get("/get-all-varmala", getAllVarmala);

router.post("/upload-varmala-image", uploadMiddleWare.single("file"), uploadVarmalaImage);

module.exports = router;
