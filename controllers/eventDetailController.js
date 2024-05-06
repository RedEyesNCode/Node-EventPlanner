const eventDetailSchema = require("../Model/eventDetailSchema");


exports.linkEventDetail = async (req, res) => {
    try {
        const eventDetail = new eventDetailSchema(req.body);
        await eventDetail.save();
        res.json({ status : "Success", code : 200, message: "Event Detail Linked Successfully" , data : eventDetail});
    } catch (error) {
        res.json({ status : "Error", code : 200, message: "Event Detail Linking Failed" , error : error});
    }
}

exports.deleteEventDetail = async (req, res) => {
    try {
        const { eventId } = req.body;
        const deletedEventDetail = await eventDetailSchema.findOneAndDelete({ eventId });
        res.json({ status : "Success", code : 200, message: "Event Detail Deleted Successfully" , data : deletedEventDetail});
    } catch (error) {
        res.json({ status : "Error", code : 200, message: "Event Detail Deletion Failed" , error : error});
    }

};

exports.getEventDetail = async (req, res) => {
    try {
        const { eventId } = req.body;
        const eventDetail = await eventDetailSchema.findOne({ eventId });
        res.json({ status : "Success", code : 200, message: "Event Detail Fetched Successfully" , data : eventDetail});
    } catch (error) {
        res.json({ status : "Error", code : 200, message: "Event Detail Fetching Failed" , error : error});
    }
}