const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");

const {createBand,deleteBand,getAllBand,uploadgBandImage} =require( "../controllers/bandController");

router.post("/create-band",createBand)


router.post("/delete-band",deleteBand)


router.get("/get-all-band" ,getAllBand);


router.post("/upload-band-image",uploadMiddleWare.single("file") ,uploadgBandImage);

module.exports = router;