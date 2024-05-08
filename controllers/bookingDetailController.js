const bookingDetailSchema = require("../Model/bookingDetailSchema");
const eventSchema = require("../Model/eventSchema");

exports.createBookingDetail = async (req, res) => {
  try {
    const bookingDetail = new bookingDetailSchema(req.body);
    const event = await eventSchema.findById(req.body.event_id);
    await event.updateOne({ $push: { booking_details: bookingDetail._id } });
    await event.save();
    await bookingDetail.save();
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Booking Detail Created Successfully",
      data: bookingDetail,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 400,
      message: "Booking Detail Creation Failed",
      error: error,
    });
  }
};

exports.getBookingDetailByEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const bookingDetail = await bookingDetailSchema.findOne({ eventId });
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Booking Detail Fetched Successfully",
      data: bookingDetail,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 400,
      message: "Booking Detail Fetching Failed",
      error: error,
    });
  }
};

exports.updateBookingDetail = async (req, res) => {
  try {
    const { bookingDetailId } = req.body;
    const bookingDetail = await bookingDetailSchema.findByIdAndUpdate(
      bookingDetailId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Booking Detail Updated Successfully",
      data: bookingDetail,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 400,
      message: "Booking Detail Updation Failed",
      error: error,
    });
  }
};


exports.getAllBookingDetail = async (req, res) => {
  try {
    const bookingDetail = await bookingDetailSchema.find().populate("event_id");
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "All Booking Detail Fetched Successfully",
      data: bookingDetail,
    });
  } catch (error) {
    res.status(200).json({
      status: "Failed",
      code: 400,
      message: "All Booking Detail Fetching Failed",
      error: error,
    });
  }
}