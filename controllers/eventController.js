const eventSchema = require("../Model/eventSchema");
const userSchema = require("../Model/userSchema");
const CategoriesSchema = require("../Model/categoriesSchema");
const decorationSchema = require("../Model/decorationSchema");
const bandSchema = require("../Model/bandSchema");
const cateringSchema = require("../Model/cateringSchema");
const dholSchema = require("../Model/dholSchema");
const DjBandSchema = require("../Model/DjBandSchema");
const entertainmentSchema = require("../Model/entertainmentSchema");
const hotelSchema = require("../Model/hotelSchema");
const makeupSchema = require("../Model/makeupSchema");
const panditSchema = require("../Model/panditSchema");
const photoVideoSchema = require("../Model/photoVideoSchema");
const tentHouseSchema = require("../Model/tentHouseSchema");
const travelSchema = require("../Model/travelSchema");
const varmalaSchema = require("../Model/varmalaSchema");
const venueSchema = require("../Model/venueSchema");
const weddingDressSchema = require("../Model/weddingDress");


exports.CreateEvent = async (req, res) => {
  try {
    const newEvent = new eventSchema(req.body); // New event
    const categoryId = req.body.category_id;
    const userId = req.body.userId;
    const categorie = await CategoriesSchema.findById(categoryId); // Finding category
    const user = await userSchema.findById(userId); // Finding user
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
    if (user.subscriptions.length > 0) {
      const lastSubscriptionDate = user.subscriptions[user.subscriptions.length - 1].date;
      const currentDate = Date.now();
      const differenceInDays = Math.floor((currentDate - lastSubscriptionDate ) / (1000 * 60 * 60 * 24));
      console.log(lastSubscriptionDate,currentDate,differenceInDays)
      if (differenceInDays > 15) {
        // Subscription expired, update isPaid to false
        user.isPaid = false;
        await user.save();

        return res.status(200).json({
          status: "Failed",
          code: 401,
          message: "Your Subscription is Expired"
        });
      }
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
    let data;

    if (event.category_id) {
      switch (event.category_id.categories_name) {
          case "DECORATION":
              data = await decorationSchema.find({ event_id: event._id });
              break;
          case "DJ AND BAND":
              data = await DjBandSchema.find({ event_id: event._id });
              break;
          case "MAKE-UP":
              data = await makeupSchema.find({ event_id: event._id });
              break;
          case "PANDIT":
              data = await panditSchema.find({ event_id: event._id });
              break;
          case "PHOTO-VIDEO":
              data = await photoVideoSchema.find({ event_id: event._id });
              break;
          case "TENTHOUSE":
              data = await tentHouseSchema.find({ event_id: event._id });
              break;
          case "TRAVEL":
              data = await travelSchema.find({ event_id: event._id });
              break;
          case "VARMALA-ENTRY":
              data = await varmalaSchema.find({ event_id: event._id });
              break;
          case "VENUE":
              data = await venueSchema.find({ event_id: event._id });
              break;
          case "WEDDING DRESS":
              data = await weddingDressSchema.find({ event_id: event._id });
              break;
          case "CATERING":
              data = await cateringSchema.find({ event_id: event._id });
              break;
          case "DHOL":
              data = await dholSchema.find({ event_id: event._id });
              break;
          case "BAND":
              data = await bandSchema.find({ event_id: event._id });
              break;
          case "ENTERTAINMENT":
              data = await entertainmentSchema.find({ event_id: event._id });
              break;
          case "HOTEL":
              data = await hotelSchema.find({ event_id: event._id });
              break;
          default:
              // Handle the case where the category is not recognized
              data = event.category_id.categories_name;
              break;
      }
  }
    
    res.status(200).json({
        status: "Success",
        code: 200,
        message: "Event retrieved successfully",
        data: event,
        eventCategoryData: data ? JSON.stringify(data) : "No category is found"
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 500,
      message: error.message,
    });
  }
};
