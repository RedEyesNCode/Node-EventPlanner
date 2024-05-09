const express = require("express");
const router = express.Router();
const {
    createPandit,
    getPandit,
    deletePandit
} = require("../controllers/panditController");

router.post("/create-pandit", createPandit);

router.get("/get-pandit", getPandit);

router.post("/delete-pandit", deletePandit);


module.exports = router;