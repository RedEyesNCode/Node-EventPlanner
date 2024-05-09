const express = require("express");
const router = express.Router();

const {createWeddingDress,deleteWeddingDress} = require("../controllers/weddingDressController");

router.post("/create-wedding-dress", createWeddingDress);


router.post("/delete-wedding-dress", deleteWeddingDress);


module.exports = router;