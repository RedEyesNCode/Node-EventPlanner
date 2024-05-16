var express = require('express');
const {createhotel,getAllHotel,uploadgHotelImage} = require('../controllers/hotelController.js');
const uploadMiddleWare = require("../utils/fileupload.js");
var router = express.Router();


router.post("/create-hotel",createhotel);

router.get("/get-all-hotel",getAllHotel);

router.post("/upload-hotel-image",uploadMiddleWare.single("file") ,uploadgHotelImage);

module.exports = router;