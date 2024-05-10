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
        type : String,
        default : ''
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
        type : String,
        default : ''
    },
    images :[{
        type : String
    }],
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Megma-Event"
    },
})

travelSchema.pre("save", function (next) {
    if (this.images.length === 0) {
      this.images.push(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK4CYRZ8ywvB2LlPKMlDs4mj2uEiFPLZPwNw&s"
      );
    }
    next();
  });


module.exports = mongoose.model('Travel', travelSchema);