const CategoriesSchema= require("../Model/categoriesSchema");



exports.CreateCategories=async(req,res)=>{
    try {
    // Reqjson come from req.body
     const reqJson=({categories_name,description,venueId}=req.body);

    //  if no reqjson then Send Error
    if (!reqJson || Object.keys(reqJson).length === 0) {
        return res.status(400).json({
            status: "Failed",
            code: 400,
            message: "No data received in the request body"
        });
    }
    // Saveing json data to location Schema 
    const newcategories= new CategoriesSchema({...reqJson,venue:venueId});
    const savedcategories= await newcategories.save();
    // Send the categories Succesfully
    res.status(200).json({
        status: "Success",
        code: 200,
        message: " categories Created Succesfully",
        data: savedcategories,
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



exports.Allcategories=async(req,res)=>{
    try {
        // Find all categories 
        const categories=await CategoriesSchema.find().populate("venue");
        // Show all categories
        res.status(200).json({
            status:"Success",
            code:200,
            message:"All location retrieved successfully",
            data:categories
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


exports.Deletecategories= async(req,res)=>{
    try {
        // destructring categoriesId from req.body
        const { categoriesId } = req.body;
        console.log(categoriesId);
        // If no categoriesId then Send Error
        if (!categoriesId) {
            return res.status(200).json({
                status: "Failed",
                code: 400,
                message: 'categoriesId is required'
            });
        }
        // find by categoriesId and Delete the specific categories
        const categories = await CategoriesSchema.findOneAndDelete({ _id: categoriesId });

        // if no categories then send  Error cattegories Not found

        if (!categories) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: 'cattegories not found'
            });
        }
        // show message in json 
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "cattegories Deleted Successfully"
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

exports.Updatecategories= async(req,res)=>{
    try {
        const reqjson=({categories_name,description,categoriesId}=
            req.body)

            if(!categoriesId){
                return res.status(200).json({
                    status:"Failed",
                    code:400,
                    message:"categories ID is required for update"
                })
            }

            // updating Data

            const updatedData={
                categories_name:reqjson.categories_name,
                description:reqjson.description
            }

            // update data of categories Schema
            const updatedCategories= await CategoriesSchema.findByIdAndUpdate(
                {_id:reqjson.categoriesId},
                {$set:updatedData}, // Update the categories data
                {new:true}  // Return the updated document
            )
            .exec()

             // not having categories then Show Error
             if(!updatedCategories){
                return res.status(200).json({
                    Status:"Failed",
                    code:400,
                    message:"Please Give a valid categories Id"
                })
             }

             // Send Response after updating the the location
          res.status(200).json({
            status: "Success",
            code: 200,
            message: "User categories is Updated !",
            data: updatedCategories,
          });
    } catch (error) {
        // Return error response if any error occurs
        res
        .status(200)
        .json({ status: "Failed", code: 500, message: error.message });
    
    }
}