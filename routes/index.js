var express = require('express');
const { Signup, login, DeleteUser,getAllUser,logout ,getAllUserEvents,getAllEventsByCategory,getUserEventsByName,IsUserPaid, forgotPassword, resetPassword, getUserEventCount} = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello from Event planner")
});



//   Post /Signup
router.post("/signup",Signup);    

// POST /login
router.post("/login",login)

router.post("/logout",logout)

router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword);


// Post /Delete
router.post("/deleteuser",DeleteUser)

router.get("/getAllUser",getAllUser)

router.post("/get-user-events",getAllUserEvents)

router.post("/get-user-events-by-category",getAllEventsByCategory)

router.post("/get-user-events-by-name",getUserEventsByName)

router.post("/is-user-paid",IsUserPaid)

router.post("/get-user-event-count",getUserEventCount);

module.exports = router;
