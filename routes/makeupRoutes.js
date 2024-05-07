const express = require("express");

const router = express.Router();

const {
  createmakeup,
  deletemakeup,
  updatemakeup,
  getAllmakeup,
} = require("../controllers/makeupController");

router.post("/create-makeup", createmakeup);

router.post("/delete-makeup", deletemakeup);

router.post("/update-makeup", updatemakeup);

router.get("/get-all-makeup", getAllmakeup);

module.exports = router;
