const mongoose = require("mongoose");

// connecting Database
mongoose
    .connect("mongodb://127.0.0.1:27017/EventPlanner")
    .then(()=> console.log("Database connected!"))
    .catch((err)=> console.log(err));