const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");

const {createEntertainment,deleteEntertainment,getAllEntertainment,uploadgEntertainmentImage} =require( "../controllers/entertainmentController");

router.post("/create-entertainment",createEntertainment)


router.post("/delete-entertainment",deleteEntertainment)


router.get("/get-all-entertainment" ,getAllEntertainment);


router.post("/upload-entertainment-image",uploadMiddleWare.single("file") ,uploadgEntertainmentImage);

module.exports = router;