const mongoose = require('mongoose');

const makeupSchema = new mongoose.Schema({
    service_name : {
        type : String,
        default : ''
    },
    first_name : {
        type : String,
        default : ''
    },
    last_name : {
        type : String,
        default : ''
    },
    members : {
        type : Number,
        default : 0
    },
    description : {
        type : String,
        default : ''
    },
    hourly_rate : {
        type : Number,
        default : 0
    },
    min_hours : {
        type : Number,
        default : 0
    },
    rate : {
        type : Number,
        default : 0
    },
    location : {
        type : String,
        default : ''
    },
    contact_information : {
        type : String,
        default : ''
    },
})

module.exports = mongoose.model('Makeup-Artist', makeupSchema);