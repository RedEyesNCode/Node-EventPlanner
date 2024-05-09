const express = require("express");
const router = express.Router();

const {createCatering,deleteCatering} =require( "../controllers/cateringController");

router.post("/create-catering",createCatering)


router.post("/delete-catering",deleteCatering)


module.exports = router;