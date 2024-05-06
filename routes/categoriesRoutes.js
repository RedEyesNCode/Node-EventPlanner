var express= require('express');
const { CreateCategories, Allcategories, Deletecategories, Updatecategories } = require('../controllers/categoriesController');

var router=express.Router();

// post /createcategories
router.post("/create-categories",CreateCategories);
// get /allcategories
router.get("/all-categories",Allcategories);

// post /deletecategories
router.post("/delete-categories",Deletecategories);

// post /updatecategorie

router.post("/update-categories",Updatecategories)



module.exports=router;