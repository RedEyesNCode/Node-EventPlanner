const express = require("express");
const router = express.Router();
const {createBookingDetail,updateBookingDetail,getAllBookingDetail} = require("../controllers/bookingDetailController");


router.post("/create-bookingDetail", createBookingDetail);

router.post("/update-bookingDetail", updateBookingDetail);


router.get("/get-all-bookingDetail", getAllBookingDetail);



module.exports = router;
