const mongoose=require("mongoose");

const eventSchema = new mongoose.Schema({
    event_name:{
        type:String,
        required:true
    },
    event_type:{
        type:String,
        required:true
    },
    start_Date:{
        type:Date,
        required:true
    },
    end_Date:{
        type:String,
        required:true
    },
    location_id:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
        required:true,
        enum:["planning","confirmed","canceled"]
    }
},{timestamps:true})

// eventSchema.pre('save', function (next) {
//     const event = this;
  
//     // Convert start and end date to IST before saving
//     event.start_date = moment(event.start_date).tz('Asia/Kolkata').toDate();
//     event.end_date = moment(event.end_date).tz('Asia/Kolkata').toDate();
  
//     next();
//   });

module.exports= mongoose.model('Megma-Event',eventSchema);