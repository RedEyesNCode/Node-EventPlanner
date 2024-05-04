const lacationSchema = require("../Model/lacationSchema");


exports.CreateLocation=async(req,res)=>{
   try {
    // Reqjson come from req.body
    const reqJson=({venue_name,address,capacity,contact_number,contact_name,website}=req.body)
    // if  no reqJson there send Error 
    if (!reqJson || Object.keys(reqJson).length === 0) {
        return res.status(200).json({
            status: "Failed",
            code: 400,
            message: "No data received in the request body"
        });
    }
    // Continue processing req.body since it exists and is not empty
    
    // Saveing json data to location Schema
    const newlocation= new lacationSchema(reqJson);
    const savedlocation= await newlocation.save();
    // Send the location Succesfully
    res.status(200).json({
        status: "Success",
        code: 200,
        message: " location Created Succesfully",
        data: savedlocation,
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


exports.Alllocation=async(req,res)=>{
    try {
        // Find all location 
        const location=await lacationSchema.find()
        // Show all location
        res.status(200).json({
            status:"Success",
            code:200,
            message:"All location retrieved successfully",
            date:location
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


exports.Deletelocation= async(req,res)=>{
    try {
        // destructring location Id from req.body
        const { locationId } = req.body;
        // If no location Id then Send Error
        if (!locationId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: 'Location ID is required'
            });
        }
        // find by locationid and Delete the specific location 
        const location = await lacationSchema.findOneAndDelete({ _id: locationId });

        // if no location then send  Error Location Not found

        if (!location) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: 'location not found'
            });
        }
        // show message in json 
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "location Deleted Successfully"
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

exports.Updatelocation=async(req,res)=>{
    try {
        const reqJson = ({ venue_name, address, capacity, contact_number, contact_name,website,locationId } =
            req.body);
            // location id not exist then
            if(!locationId){
                return res.status(200).json({
                    status:"Failed",
                    code:400,
                    message:"LocationId is required for update"
                })
            }
        // updating Data 

          const updatedData = {
            venue_name: reqJson.venue_name,
            address: reqJson.address,
            capacity:reqJson.capacity,
            contact_number:reqJson.contact_number,
            contact_name:reqJson.contact_name,
            website:reqJson.website
          };

        //   update Data in LocationSchema
          const updatedlocation = await lacationSchema.findOneAndUpdate(
              { _id: reqJson.locationId },
              { $set: updatedData }, // Update the location data
              { new: true } // Return the updated document
            )
            .exec();

            //  // not having location then Show Error
            if(!updatedlocation){
                return res.status(200).json({
                    status:"Failed",
                    code:400,
                    message:"Please Give a valid location Id"
                })
            } 
            // Send Response after updating the the location
          res.status(200).json({
            status: "Success",
            code: 200,
            message: "User location is Updated !",
            data: updatedlocation,
          });
    } catch (error) {
        // Return error response if any error occurs
        res
        .status(200)
        .json({ status: "Failed", code: 500, message: error.message });
    
    }
}