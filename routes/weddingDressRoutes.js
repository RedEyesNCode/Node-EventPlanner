const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");


const {createWeddingDress,deleteWeddingDress,uploadWeddingDressImage,getAllWeddingDress} = require("../controllers/weddingDressController");

router.post("/create-wedding-dress", createWeddingDress);


router.post("/delete-wedding-dress", deleteWeddingDress);


router.get("/get-all-wedding-dress" ,getAllWeddingDress);


router.post("/upload-wedding-dress-image",uploadMiddleWare.single("file") ,uploadWeddingDressImage);


module.exports = router;