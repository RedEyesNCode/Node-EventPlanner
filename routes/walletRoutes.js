const express = require("express");
const {
    createWallet,
    updateWallet,
    getWallet
} = require("../controllers/walletControllers");

const router = express.Router();

// post //createvenue
router.post("/create-wallet", createWallet);

router.post("/update-wallet", updateWallet);

router.post("/get-wallet", getWallet);

module.exports = router;
