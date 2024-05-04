const express =require("express");
const { CreateDecoration } = require("../controllers/decorationConroller");
const router=express.Router();

// post /createdecoration

router.post("/createdecoration",CreateDecoration);

module.exports=router;