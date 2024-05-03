var express = require('express');
const { Signup, login, DeleteUser,getAllUser } = require('../controllers/userController');
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

// Post /Delete
router.post("/deleteuser",DeleteUser)

router.get("/getAllUser",getAllUser)


module.exports = router;
