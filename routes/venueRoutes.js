const express=require("express")
const { Createvenue, Updatevenue, Searchvenue } = require("../controllers/venueController")

const router=express.Router()


// post //createvenue
router.post("/createvenue",Createvenue);

// post /updatevenue
router.post("/updatevenue",Updatevenue);

// post /searchvenue

router.post("/searchvenue",Searchvenue);

module.exports=router ;