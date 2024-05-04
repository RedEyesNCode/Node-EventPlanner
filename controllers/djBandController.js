const DjBandSchema = require("../Model/DjBandSchema");


exports.CreateDjband= async(req,res)=>{
    try {
        const reqjson=({dj_band_name,members,genre,description,availability,rate,location,equipment,reviews,rating,contact_information}
            =req.body);
        
        if(!reqjson|| Object.keys(reqjson).length===0){
            return res.status(200).json({
                status:"Failed",
                code:400,
                message:"No data received"
            });

        }
        const newDj=new DjBandSchema(reqjson);
        const saveDj=await newDj.save();

        res.status(200).json({
            status:"Success",
            code:200,
            message:"Dj Band Created Succesfully",
            data:saveDj
        })
    } catch (error) {
        // Show Error
        res.status(200).json({
            status:"Failed",
            Code:500,
            message:error.message
          })
    }
}


exports.UpdateDj= async(req,res)=>{
   try {
    const reqJson=({djId,dj_band_name,members,genre,description,availability,rate,location,equipment,reviews,rating,contact_information}=req.body);
    if(!djId){
        return res.status(200).json({
            status: "Failed",
            code: 400,
            message: "Dj ID is required for update"
        });
    }

    const UpdateData= {
        dj_band_name:reqJson.dj_band_name,
        members:reqJson.members,
        genre:reqJson.genre,
        description:reqJson.description,
        availability:reqJson.availability,
        rate:reqJson.rate,
        location:reqJson.location,
        equipment:reqJson.equipment,
        reviews:reqJson.reviews,
        rating:reqJson.rating,
        contact_information:reqJson.contact_information
    }

    const updatedData= await DjBandSchema.findByIdAndUpdate(
        {_id:reqJson.djId},
        {$set:UpdateData},
        {new:true}
    )
    .exec()

    if(!updatedData){
        return res.status(200).json({
            Status:"Failed",
            code:400,
            message:"Please Give a valid DJ Id"
        })
    }
    res.status(200).json({
        status: "Success",
        code: 200,
        message: "Event Updated Successfully",
        data: updatedData
    });

   } catch (error) {
    res.status(200).json({
        status: "Failed",
        code: 500,
        message: error.message
    });
   } 
}


exports.SearchDj= async(req,res)=>{
    const {dj_band_name,location}=req.body;
    const searchQuery={};
    if(dj_band_name){
        searchQuery.dj_band_name={$regex:new RegExp(dj_band_name,'i')};
    }
    if(location){
        searchQuery.location={$regex:new RegExp(location,"i")};
    }

    const Dj=await DjBandSchema.find(searchQuery);

    if(Dj.length===0){
        return res.status(200).json({
            status:"Failed",
            code:400,
            message:"No Dj or Band Found to Serch Criteria"
        })
    }

    res.status(200).json({
        status:"Success",
        code:200,
        message:"Dj and Band Found Succesfully",
        data:Dj
    })
}