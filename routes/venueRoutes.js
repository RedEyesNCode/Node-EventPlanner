const express = require("express");
const uploadMiddleWare = require("../utils/fileupload");
const {
  Createvenue,
  Updatevenue,
  Searchvenue,
  deleteVenue,
  getAllVenue,
  uploadVenueImage,
} = require("../controllers/venueController");

const router = express.Router();

// post //createvenue
router.post("/create-venue", Createvenue);

router.post("/delete-venue", deleteVenue);

router.get("/get-all-venue", getAllVenue);

// post /updatevenue
router.post("/update-venue", Updatevenue);

// post /searchvenue

router.post(
  "/upload-venue-image",
  uploadMiddleWare.single("file"),
  uploadVenueImage
);

router.post("/search-venue", Searchvenue);

module.exports = router;
