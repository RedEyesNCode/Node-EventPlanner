const express = require("express");
const uploadMiddleWare = require("../utils/fileupload");
const router = express.Router();

const {
  createmakeup,
  deletemakeup,
  updatemakeup,
  getAllmakeup,
  uploadMakeupImage
} = require("../controllers/makeupController");

router.post("/create-makeup", createmakeup);

router.post("/delete-makeup", deletemakeup);

router.post("/update-makeup", updatemakeup);

router.get("/get-all-makeup", getAllmakeup);

router.post("/upload-makeup-image", uploadMiddleWare.single("file"), uploadMakeupImage);

module.exports = router;
