var express = require('express');

var router = express.Router();
// checking route
router.get('/', function(req, res, next) {
    res.json({
        message:"Checking event route"
    })
  });
  

module.exports=router;