var express = require('express');
const { CreateEvent, DeleteEvent, UpdateEvent, Allevent } = require('../controllers/eventController');

var router = express.Router();

// EVENT ROUTE

// post /createevent
router.post("/createevent",CreateEvent); 

// post /deleteevent
router.post("/deleteevent",DeleteEvent);

// post /updateevent

router.post("/updateevent",UpdateEvent)

// get /getallevents

router.get("/getallevents",Allevent)
  

module.exports=router;