const categoriesSchema = require("../Model/categoriesSchema");
const CategoriesSchema= require("../Model/categoriesSchema");



exports.CreateCategories=async(req,res)=>{
    try {
    // Reqjson come from req.body
     const reqJson=({categories_name,description}=req.body);

    //  if no reqjson then Send Error
    if(!reqJson){
        return res.status(200).json({
            status:"Failed",
            code:500,
            message:"Null data is there"
        })
    }
    // Saveing json data to location Schema 
    const newcategories= new CategoriesSchema(reqJson);
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
        const categories=await categoriesSchema.find()
        // Show all categories
        res.status(200).json({
            status:"Success",
            code:200,
            message:"All location retrieved successfully",
            date:categories
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


// exports.Deletelocation= async(req,res)=>{
//     try {
//         // destructring categoriesId from req.body
//         const { categoriesId } = req.body;
//         // If no categoriesId then Send Error
//         if (!categoriesId) {
//             return res.status(200).json({
//                 status: "Failed",
//                 code: 400,
//                 message: 'categoriesId is required'
//             });
//         }
//         // find by categoriesId and Delete the specific categories
//         const categories = await categoriesSchema.findOneAndDelete({ _id: categoriesId });

//         // if no categories then send  Error Location Not found

//         if (!categories) {
//             return res.status(200).json({
//                 status: "Failed",
//                 code: 404,
//                 message: 'location not found'
//             });
//         }
//         // show message in json 
//         res.status(200).json({
//             status: "Success",
//             code: 200,
//             message: "location Deleted Successfully"
//         });
//     } catch (error) {
//         // Return error response if any error occurs
//         res.status(200).json({
//             status: "Failed",
//             code: 500,
//             message: error.message
//         });
//     }
// }