const express =require("express");
const router=express.Router();


const uploadMiddleWare = require("../utils/fileupload");
const { createDecoration,deleteDecoration,getAllDecoration, updateDecoration,uploadDecorationImage } = require("../controllers/decorationConroller");



router.post("/create-decoration",createDecoration);

router.post("/delete-decoration", deleteDecoration);

router.get("/get-all-decoration", getAllDecoration);

router.post("/update-decoration", updateDecoration);

router.post("/upload-decoration-image",uploadMiddleWare.single("file"),uploadDecorationImage)



module.exports=router;