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
//ek category se kitne bhi event  link ho sakte hain mtlb category se kitne event link ho sakte hain
//or cat k object me event id store hain or event k object me cat id store hain 


module.exports=router;