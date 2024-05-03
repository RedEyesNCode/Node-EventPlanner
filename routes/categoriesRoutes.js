var express= require('express');
const { CreateCategories, Allcategories, Deletecategories } = require('../controllers/categoriesController');

var router=express.Router();

// post /createcategories
router.post("/createcategories",CreateCategories);
// get /allcategories
router.get("/allcategories",Allcategories);

// post /deletecategories
router.post("/deletecategories",Deletecategories);



module.exports=router;