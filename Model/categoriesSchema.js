const mongoose= require("mongoose")

// Categories Schema Created

const categoriesSchema= new mongoose.Schema({
    categories_name:{
        type:String,
        uniqe:true,
    },
    description:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("Categories",categoriesSchema)