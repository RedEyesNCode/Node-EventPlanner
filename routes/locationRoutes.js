const express=require("express");
const { CreateLocation, Alllocation, Deletelocation, Updatelocation } = require("../controllers/locationController");
const router=express.Router();

// LOCATION ROUTE


// post /createlocation
router.post("/createlocation",CreateLocation); 


// post /deletelocation
router.post("/deletelocation",Deletelocation);



// post /updatelocation
router.post("/updatelocation",Updatelocation)



// Get /getalllocation
router.get("/getalllocation",Alllocation)

module.exports=router