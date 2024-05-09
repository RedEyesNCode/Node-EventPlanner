const eventSchema = require("../Model/eventSchema");
const userSchema = require("../Model/userSchema");
const CategoriesSchema = require("../Model/categoriesSchema");

exports.CreateEvent = async (req, res) => {
  try {
    const newEvent = new eventSchema(req.body); // New event
    const categoryId = req.body.category_id;
    const userId = req.body.userId;
    console.log("Category ID:", categoryId);
    console.log("User ID:", userId);

    const categorie = await CategoriesSchema.findById(categoryId); // Finding category
    const user = await userSchema.findById(userId); // Finding user
    console.log("Category:", categorie);
    console.log("User:", user);

    // Handling if category or user is not found
    if (!categorie) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "Category not found",
      });
    }

    if (!user) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "User not found",
      });
    }

    user.events.push(newEvent._id); // Pushing event id in user schema
    await user.save(); // Saving user
    categorie.events.push(newEvent._id); // Pushing event id in categories schema
    await categorie.save(); // Saving categories

    const savedEvent = await newEvent.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Event Created Successfully",
      data: savedEvent,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.DeleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    // if not have event id then show error
    if (!eventId) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "Event ID is required",
      });
    }
    // Delete event by Schema
    const Event = await eventSchema.findOneAndDelete({ _id: eventId });
    // if not having event then error
    if (!Event) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "Event not found",
      });
    }
    // Show Data Sussfully
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Event Deleted Successfully",
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

exports.UpdateEvent = async (req, res) => {
  try {
    const reqJson = ({
      event_name,
      event_type,
      eventId,
      start_date,
      end_date,
      Status,
      location_id,
      description,
      userId,
    } = req.body);
    // Event id not exist then
    if (!eventId) {
      return res.status(200).json({
        status: "Failed",
        code: 400,
        message: "Event ID is required for update",
      });
    }
    // updating Data
    const updatedData = {
      event_name: reqJson.event_name,
      event_type: reqJson.event_type,
      start_date: reqJson.start_date,
      end_date: reqJson.end_date,
      location_id: reqJson.location_id,
      description: reqJson.description,
      Status: reqJson.Status,
      userId: reqJson.userId,
    };

    //   update Data in eventSchema
    const updatedEvent = await eventSchema
      .findOneAndUpdate(
        { _id: reqJson.eventId },
        { $set: updatedData }, // Update the event data
        { new: true } // Return the updated document
      )
      .exec();

    // not having Event then Show Error
    if (!updatedEvent) {
      return res.status(200).json({
        Status: "Failed",
        code: 400,
        message: "Please Give a valid event Id",
      });
    }
    // Send response after updating the event
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Event Updated Successfully",
      data: updatedEvent,
    });
  } catch (error) {
    // Return error response if any error occurs
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.Allevent = async (req, res) => {
  try {
    // finding all event
    const events = await eventSchema
      .find()
      .populate("userId")
      .populate("location_id")
      .populate("category_id")
      .populate("eventDetail_id")
      .populate("booking_details")
      .exec();
    // if not having event then show error
    if (events.length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "No event found",
      });
    }

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "All events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.getEventByCategoryId = async (req, res) => {
  try {
    // finding event by category id
    const events = await eventSchema
      .find({ category_id: req.body.category_id })
      .populate("userId")
      .populate("location_id")
      .populate("category_id")
      .populate("booking_details")
      .exec();
    if (events.length === 0) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "No event found",
      });
    }

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "All events retrieved successfully",
      data: events,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await eventSchema
      .findById(req.body.eventId)
      .populate("userId")
      .populate("location_id")
      .populate("category_id")
      .populate("eventDetail_id")
      .populate("booking_details")
      .exec();
    if (!event) {
      return res.status(200).json({
        status: "Failed",
        code: 404,
        message: "Event not found",
      });
    }
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};
