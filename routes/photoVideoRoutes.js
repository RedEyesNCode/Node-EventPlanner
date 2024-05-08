const express = require("express");
const router = express.Router();
const {
    createPhotoVideo,
    deletePhotoVideo,
    updatePhotoVideo,
    getAllPhotoVideo,
  } = require("../controllers/photoVideoController");
  
  router.post("/create-photoVideo", createPhotoVideo);
  
  router.post("/delete-photoVideo", deletePhotoVideo);
  
  router.post("/update-photoVideo", updatePhotoVideo);
  
  router.get("/get-all-photoVideo", getAllPhotoVideo);


module.exports = router;