const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");

const {createDhol,deleteDhol,getAllDhol,uploadgDholImage} =require( "../controllers/dholController");

router.post("/create-dhol",createDhol)


router.post("/delete-dhol",deleteDhol)


router.get("/get-all-dhol" ,getAllDhol);


router.post("/upload-dhol-image",uploadMiddleWare.single("file") ,uploadgDholImage);

module.exports = router;