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
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "User Logged in !",
      data: loginUser,
    });
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", code: 500, message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "User Logged out !",
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 200,
      message: error.message,
    });
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
    const user = await userSchema.findById(req.body.userId).populate("events");
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "All Events",
      data: user, // Accessing the populated events directly from the user object
    });
  } catch (error) {
    res.status(500).json({ // Correcting status code to 500 for server error
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.getAllEventsByCategory = async (req, res) => {
  try {
    const { userId, categoryName } = req.body;

    // Find the user by ID and populate the events and category fields
    const user = await userSchema
      .findById(userId)
      .populate({
        path: 'events',
        populate: {
          path: 'category_id',
          model: 'Categories',
        },
      });

    // Filter events based on the category name
    const filteredEvents = user.events.filter(event => event.category_id.categories_name === categoryName);

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Filtered Events",
      data: filteredEvents,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.getUserEventsByName = async (req, res) => {
  try {
    const { userId, eventName } = req.body;

    // Find the user by ID and retrieve only the events
    const user = await userSchema.findById(userId).populate('events');

    // Filter events based on the event name
    const filteredEvents = user.events.filter(event => event.event_name.includes(eventName)); 

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Filtered Events by Name",
      data: filteredEvents,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

