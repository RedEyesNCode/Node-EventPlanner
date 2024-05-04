const mongoose= require("mongoose")

// Categories Schema Created

const categoriesSchema= new mongoose.Schema({
    categories_name:{
        type:String,
    },
    description:{
        type:String
    },
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"venue-Details"
    }
},{timestamps:true})

module.exports=mongoose.model("Categories",categoriesSchema)