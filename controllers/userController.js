const userSchema = require("../Model/userSchema");

exports.Signup= async(req,res)=>{
    try {
        const {email,PhoneNumber,name,password}=req.body;
        if(!PhoneNumber||!email||!name||!password){
            return res.status(200).json({
                code:400,
                status:"Failed",
                message:"Some required Field You are Missing"
            });
        }
        const existingUser= await userSchema.findOne({PhoneNumber:PhoneNumber});
        if(existingUser){
            return res.status(200).json({
              code:400,
              status:"Failed",
              message:"User with this Phone Number is Already exits"
            })
          }
          const user=new userSchema(req.body);
          await user.save();
          res.status(200).json({
            status: "Success",
            code: 200,
            message: "User created",
            data: user,
          });
    } catch (error) {
      res.status(200).json({
        status:"Failed",
        Code:500,
        message:error.message
      }) 
    }
}

exports.login= async(req,res)=>{
    const reqJson= ({email,password,PhoneNumber}=req.body);
    try {
        const loginUser= await userSchema.findOne({
            $or:[{email:reqJson.email},{PhoneNumber:reqJson.PhoneNumber}],
            password:reqJson.password,
        }).exec();
        loginUser.isLoggedIn = true;
        // console.log(loginUser);
        loginUser.save();
        res.status(200).json({
            status: 200,
            code: 200,
            message: "User Logged in !",
            data: loginUser,
          });
    } catch (error) {
        res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
    }
}