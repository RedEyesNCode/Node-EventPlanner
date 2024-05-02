const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    PhoneNumber:{
        type:String,
        unique:true,
        match:/^[0-9]{10}$/
    },
    Address:{
        type:String,
    },
    password:{
        type:String,
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


module.exports=mongoose.model("Users-Profile-Data",userSchema)