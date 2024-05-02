const lacationSchema = require("../Model/lacationSchema");


exports.CreateLocation=async(req,res)=>{
   try {
    const reqJson=({venue_name,address,capacity,contact_number,contact_name,website}=req.body)
    if(!reqJson){
        return res.status(200).json({
            status:"Failed",
        Code:500,
        message:"Null Data is There"
        })
    }
    const newlocation= new lacationSchema(reqJson);
    const savedlocation= await newlocation.save();
    res.status(200).json({
        status: "Success",
        code: 200,
        message: " location Created Succesfully",
        data: savedlocation,
      });
   } catch (error) {
    res.status(200).json({
        status:"Failed",
        Code:500,
        message:error.message
      }) 
   }
}


exports.Alllocation=async(req,res)=>{
    try {
        const location=await lacationSchema .find()
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
        const { locationId } = req.body;

        if (!locationId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: 'Location ID is required'
            });
        }

        const location = await lacationSchema.findOneAndDelete({ _id: locationId });

        if (!location) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: 'location not found'
            });
        }

        res.status(200).json({
            status: "Success",
            code: 200,
            message: "location Deleted Successfully"
        });
    } catch (error) {
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}