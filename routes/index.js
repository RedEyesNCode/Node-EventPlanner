var express = require('express');
const { Signup, login } = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Register user

//   Post /Signup
router.post("/SignUp",Signup);    

// POST /login
router.post("/login",login)

module.exports = router;
