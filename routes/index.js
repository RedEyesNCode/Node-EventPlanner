var express = require('express');
const { Signup, login, DeleteUser,getAllUser,logout ,getAllUserEvents,getAllEventsByCategory,getUserEventsByName} = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Register user 

//   Post /Signup
router.post("/signup",Signup);    

// POST /login
router.post("/login",login)

router.post("/logout",logout)

// Post /Delete
router.post("/deleteuser",DeleteUser)

router.get("/getAllUser",getAllUser)

router.post("/get-user-events",getAllUserEvents)

router.post("/get-user-events-by-category",getAllEventsByCategory)

router.post("/get-user-events-by-name",getUserEventsByName)

module.exports = router;
