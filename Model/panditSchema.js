const { name } = require("ejs");
const mongoose = require("mongoose");

const panditSchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    contact:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    speciality:{
        type:String,
        default:""
    },
    years_of_experience:{
        type:String,
        default:""
    },
    event_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Megma-Event"
    }
})


module.exports = mongoose.model("Megma-Pandit", panditSchema)