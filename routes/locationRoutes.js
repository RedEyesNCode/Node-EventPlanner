const express=require("express");
const { CreateLocation, Alllocation, Deletelocation } = require("../controllers/locationController");
const router=express.Router();

// LOCATION ROUTE


// post /createlocation
router.post("/createlocation",CreateLocation); 


// post /deletelocation
router.post("/deletelocation",Deletelocation);



// post /updatelocation
// router.post("/updatelocation",Update)



// Get /getalllocation
router.get("/getalllocation",Alllocation)

module.exports=router