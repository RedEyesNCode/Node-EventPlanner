const eventSchema = require("../Model/eventSchema")


exports.CreateEvent= async(req,res)=>{
    try {
    
        const reqJson=({ event_name, event_type, start_date, end_date, location_id, description, Status,userId,location_id}=req.body)
        // if reqJson not exist then show error
        if(!reqJson){
            return res.status(200).json({
                status:"Failed",
            Code:500,
            message:"Null Data is There"
            })
        }
        // save the data to event Schema
        const newEvent= new eventSchema(reqJson);
        const savedEvent= await newEvent.save();
        // Show Data
        res.status(200).json({
            status: "Success",
            code: 200,
            message: " Event Created Succesfully",
            data: savedEvent,
          });
    } catch (error) {
        // Show Error
        res.status(200).json({
            status:"Failed",
            Code:500,
            message:error.message
          }) 
         
    }
}

exports.DeleteEvent= async(req,res)=>{
    try {
        const { eventId } = req.body;
        // if not have event id then show error
        if (!eventId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: 'Event ID is required'
            });
        }
        // Delete event by Schema
        const Event = await eventSchema.findOneAndDelete({ _id: eventId });
        // if not having event then error
        if (!Event) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: 'Event not found'
            });
        }
        // Show Data Sussfully
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "Event Deleted Successfully"
        });
    } catch (error) {
        // Show Error
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}

exports.UpdateEvent = async (req, res) => {
    try {
        const { eventId, start_date, end_date, Status } = req.body;
        // Event id not exist then
        if (!eventId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: "Event ID is required for update"
            });
        }
        // finding existing event with event id
        const existingEvent = await eventSchema.findById(eventId);
        // if not exist event then show error
        if (!existingEvent) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: "Event not found"
            });
        }
        // if start_date updated by user then start_date updated
        if (start_date) {
            existingEvent.start_date = start_date;
        }
        // if end_date updated by user then end_date updated
        if (end_date) {
            existingEvent.end_date = end_date;
        }
        // if Status updated by user then Status updated
        if (Status) {
            existingEvent.Status = Status;
        }

        // Save the existing event
        const updatedEvent = await existingEvent.save();

        // Send response after updating the event
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "Event Updated Successfully",
            data: updatedEvent
        });
    } catch (error) {
        // Return error response if any error occurs
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}

exports.Allevent=async(req,res)=>{
    try {
        // finding all event
        const events=await eventSchema.find();
        res.status(200).json({
            status:"Success",
            code:200,
            message:"All events retrieved successfully",
            date:events
        })
    } catch (error) {
        // Return error response if any error occurs
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}
