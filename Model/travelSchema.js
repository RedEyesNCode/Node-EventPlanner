const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    service_name : {
        type : String,
        default : ''
    },
    client_name : {
        type : String,
        default : ''
    },
    type_of_coverage : {
        type : String,
        default : ''
    },
    duration : {
        type : String,
        default : ''
    },
    hourly_rate : {
        type : Number,
        default : 0
    },
    vehcile_type : {
        type : String,
        default : ''
    },
    pickup_location : {
        type : String,
        default : ''
    },
    dropoff_location : {
        type : String,
        default : ''
    },
    number : {
        type : Number,
        default : 0 
    }
})

module.exports = mongoose.model('Travel', travelSchema);