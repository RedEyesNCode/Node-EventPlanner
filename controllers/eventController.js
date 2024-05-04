const eventSchema = require("../Model/eventSchema")


exports.CreateEvent= async(req,res)=>{
    try {
    
        const reqJson=({ event_name, event_type, start_date, end_date, location_id, description, Status,userId,location_id}=req.body)
        // if reqJson not exist then show error
        if (!reqJson || Object.keys(reqJson).length === 0) {
            return res.status(400).json({
                status: "Failed",
                code: 400,
                message: "No data received in the request body"
            });
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
        const reqJson= ({ event_name,event_type,eventId, start_date, end_date, Status,location_id,description,userId } = req.body);
        // Event id not exist then
        if (!eventId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: "Event ID is required for update"
            });
        }
        // updating Data 
        const updatedData = {
            event_name: reqJson.event_name,
            event_type: reqJson.event_type,
            start_date:reqJson.start_date,
            end_date:reqJson.end_date,
            location_id:reqJson.location_id,
            description:reqJson.description,
            Status:reqJson.Status,
            userId:reqJson.userId
          };
          
        //   update Data in eventSchema
          const updatedEvent = await eventSchema.findOneAndUpdate(
              { _id: reqJson.eventId },
              { $set: updatedData }, // Update the event data
              { new: true } // Return the updated document
            )
            .exec();
          
            // not having Event then Show Error
        if(!updatedEvent){
            return res.status(200).json({
                Status:"Failed",
                code:400,
                message:"Please Give a valid event Id"
            })
        }  
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
