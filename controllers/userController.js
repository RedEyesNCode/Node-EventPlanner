const userSchema = require("../Model/userSchema");

exports.Signup = async (req, res) => {
  try {
    // destrucuring data from req.body
    const { email, PhoneNumber, name, password } = req.body;
    // if this field are not required then show error
    if (!PhoneNumber || !email || !name || !password) {
      return res.status(200).json({
        code: 400,
        status: "Failed",
        message: "Some required Field You are Missing",
      });
    }
    // Searching user alredy exit or not in schema
    const existingUser = await userSchema.findOne({ PhoneNumber: PhoneNumber });

    // if user exist then show error
    if (existingUser) {
      return res.status(200).json({
        code: 400,
        status: "Failed",
        message: "User with this Phone Number is Already exits",
      });
    }
    // saving data to schema
    const user = new userSchema(req.body);
    await user.save();
    // show succesfull data
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "User created Successfully",
      data: user,
    });
  } catch (error) {
    // show Error
    res.status(200).json({
      status: "Failed",
      Code: 500,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // saving destructure data to reqjson
    const reqJson = ({ email, password, PhoneNumber } = req.body);
    // login the user if exist or not
    const loginUser = await userSchema
      .findOne({
        $or: [{ email: reqJson.email }, { PhoneNumber: reqJson.PhoneNumber }],
        password: reqJson.password,
      })
      .exec();
    // if user not exist then show error
    if (!loginUser) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "No User Exit Please fill valid Data",
      });
    }
    // saving isloggedin to  loggin user data
    loginUser.isLoggedIn = true;
    loginUser.save();
    // Showing data succesfully
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "User Logged in !",
      data: loginUser,
    });
  } catch (error) {
    // show error
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userSchema.findOneAndUpdate(
      { _id: userId }, 
      { isLoggedIn: false },
      { new: true }
    )
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "User Logged out !",
    })
  } catch (error) {
    res.status(200).json({
      status: "Failed", 
      code: 200,
      message: error.message
    })
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    // desructure userid from req.body
    const { userId } = req.body;
    // if user id not exist then swnd error
    if (!userId) {
      return res.status(400).json({
        status: "Failed",
        code: 400,
        message: "User ID is required",
      });
    }
    // delete user by userid
    const deletedUser = await userSchema.findOneAndDelete({ _id: userId });

    // if user not found then show error
    if (!deletedUser) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "User not found",
      });
    }

    // Show Data
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    // Show Error
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "All Users",
      data: users,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.getAllUserEvents = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userSchema.findOne({ _id: userId }).populate("events");
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "All Events",
      data: user.events,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
}