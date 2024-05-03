var express = require("express");
const router = express.Router();
const {
    linkEventDetail,
    deleteEventDetail,
    getEventDetail
} = require("../controllers/eventDetailController");

router.post("/link-event-detail", linkEventDetail );

router.post("/delete-event-detail", deleteEventDetail );

router.get("/get-event-detail", getEventDetail );



module.exports = router;
