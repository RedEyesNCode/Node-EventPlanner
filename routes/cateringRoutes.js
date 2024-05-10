const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");

const {createCatering,deleteCatering,getAllCatering,uploadgCateringImage} =require( "../controllers/cateringController");

router.post("/create-catering",createCatering)


router.post("/delete-catering",deleteCatering)


router.get("/get-all-catering" ,getAllCatering);


router.post("/upload-catering-image",uploadMiddleWare.single("file") ,uploadgCateringImage);

module.exports = router;