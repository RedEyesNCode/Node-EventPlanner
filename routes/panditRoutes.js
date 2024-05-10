const express = require("express");
const router = express.Router();
const uploadMiddleWare = require("../utils/fileupload");
const {
    createPandit,
    getPandit,
    deletePandit,
    uploadPanditImage
} = require("../controllers/panditController");

router.post("/create-pandit", createPandit);

router.get("/get-pandit", getPandit);

router.post("/delete-pandit", deletePandit);

router.post("/upload-pandit-image", uploadMiddleWare.single("file"), uploadPanditImage);


module.exports = router;