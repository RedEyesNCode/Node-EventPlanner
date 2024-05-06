const express = require("express");
const {
  Createvenue,
  Updatevenue,
  Searchvenue,
  deleteVenue,
  getAllVenue
} = require("../controllers/venueController");

const router = express.Router();

// post //createvenue
router.post("/create-venue", Createvenue);

router.post("/delete-venue", deleteVenue);

router.get("/get-all-venue", getAllVenue);

// post /updatevenue
router.post("/update-venue", Updatevenue);

// post /searchvenue

router.post("/search-venue", Searchvenue);

module.exports = router;
