var express= require('express');
const { CreateCategories, Allcategories } = require('../controllers/categoriesController');

var router=express.Router();

// post /createcategories
router.post("/createcategories",CreateCategories);
// get /allcategories
router.get("/allcategories",Allcategories);


module.exports=router;