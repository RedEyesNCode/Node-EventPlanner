const mongoose = require("mongoose");

const photoVideoSchema = new mongoose.Schema({
    service_name:{
        type:String,
        default:""
    },
    client_name :{
        type:String,
        default:""
    },
    type_of_coverage :{
        type:String,
        default:""
    },
    duration:{
        type:String,
        default:""
    },
    hourly_rate :{
        type:String,
        default:""
    },
    contact_information:{
        type:String,
        default:""
    }
      
})

module.exports = mongoose.model("Photo-Video",photoVideoSchema)