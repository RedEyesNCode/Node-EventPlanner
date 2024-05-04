const decorationSchema = require("../Model/decorationSchema");


exports.CreateDecoration=async(req,res)=>{
    try {
        const reqJson=({decoration_name,description,decoration_type,theme,color,size,availability,price,vendor,reviews,rating,location,additional_information,tags}=req.body);
        if(!reqJson || Object.keys(reqJson).length===0){
            return res.status(200).json({
                status:"Failed",
                code:400,
                message:"No data reccived"
            })
        }

        const decoration= new decorationSchema(reqJson);
        const saveDecoration= await decoration.save();

        res.status(200).json({
            status:"Success",
            code:200,
            message:"Decoration Created Succesfully",
            data:saveDecoration
        })
    } catch (error) {
        res.status(200).json({
            status:"Failed",
            code:500,
            message:error.message
        })
    }
}