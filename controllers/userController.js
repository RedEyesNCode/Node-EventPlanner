const userSchema = require("../Model/userSchema");

exports.Signup= async(req,res)=>{
    try {
        // Data Structuring from req.body
        const {email,PhoneNumber,name,password}=req.body;
        // PhoneNumber,Email,name ,password are required
        if(!PhoneNumber||!email||!name||!password){
            return res.status(200).json({
                code:400,
                status:"Failed",
                message:"Some required Field You are Missing"
            });
        }
        // Checking user exist or not
        const existingUser= await userSchema.findOne({PhoneNumber:PhoneNumber});
        // send error if User not exist
        if(existingUser){
            return res.status(200).json({
              code:400,
              status:"Failed",
              message:"User with this Phone Number is Already exits"
            })
          }
        //   if user exist then save data to user Schema
          const user=new userSchema(req.body);
          await user.save();
          res.status(200).json({
            status: "Success",
            code: 200,
            message: "User created Successfully",
            data: user,
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

exports.login= async(req,res)=>{
    
    try {
        // you can login with email or phone number with password
       const reqJson= ({email,password,PhoneNumber}=req.body);
        // finding login user with reqJson Data
        const loginUser= await userSchema.findOne({
            $or:[{email:reqJson.email},{PhoneNumber:reqJson.PhoneNumber}],
            password:reqJson.password,
        }).exec();

        // If user not exit then Send error
        if(!loginUser){
            return res.status(200).json({
                status:"Failed",
                code:400,
                message:"No User Exit Please fill valid Data"
            })
        }
        // if user exist then first set loginuser true
        loginUser.isLoggedIn = true;
        // save the login user
        loginUser.save();
        // send the Data of login user
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "User Logged in !",
            data: loginUser,
          });
    } catch (error) {
        // Show Error if there is any error
        res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        
        const { userId } = req.body;
        // if userid not exist then
        if (!userId) {
            return res.status(400).json({
                status: "Failed",
                code: 400,
                message: 'User ID is required'
            });
        }
        // find and delete to userschema
        const deletedUser = await userSchema.findOneAndDelete({ _id: userId });
        // if user not exist then show error
        if (!deletedUser) {
            return res.status(200).json({
                status: "Failed",
                code: 404,
                message: 'User not found'
            });
        }
        // if user exist then show data
        res.status(200).json({
            status: "Success",
            code: 200,
            message: "User Deleted Successfully"
        });
    } catch (error) {
        // Show error 
        res.status(200).json({
            status: "Failed",
            code: 500,
            message: error.message
        });
    }
}
