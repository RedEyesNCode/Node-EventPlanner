const express = require("express");
const uploadMiddleWare = require("../utils/fileupload");
const router = express.Router();
const {
    createPhotoVideo,
    deletePhotoVideo,
    updatePhotoVideo,
    getAllPhotoVideo,
    uploadPhotoVideoImage
  } = require("../controllers/photoVideoController");
  
  router.post("/create-photoVideo", createPhotoVideo);
  
  router.post("/delete-photoVideo", deletePhotoVideo);
  
  router.post("/update-photoVideo", updatePhotoVideo);
  
  router.get("/get-all-photoVideo", getAllPhotoVideo);

  router.post("/upload-photoVideo-image", uploadMiddleWare.single("file"), uploadPhotoVideoImage);


module.exports = router;