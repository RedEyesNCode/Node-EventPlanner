const express=require("express")
const { Createvenue, Updatevenue, Searchvenue } = require("../controllers/venueController")

const router=express.Router()


router.post("/createvenue",Createvenue);

router.post("/updatevenue",Updatevenue);

router.post("/searchvenue",Searchvenue);

module.exports=router ;