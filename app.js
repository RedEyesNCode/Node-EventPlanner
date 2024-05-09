var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); // Import the cors middleware

// Requiring Routes

var indexRouter = require("./routes/index");
var eventRoutes = require("./routes/eventRoutes");
var eventDetailRoutes = require("./routes/eventDetailRoutes");
var locationRouter = require("./routes/locationRoutes");
var CategoriesRouter = require("./routes/categoriesRoutes");
const venueRouter = require("./routes/venueRoutes");
const djBandRouter = require("./routes/djBandRoutes");
const decorationRouter = require("./routes/decorationRoutes");
const tentHouseRouter = require("./routes/tentHouseRoutes");
const travelRouter = require("./routes/travelRoutes");
const makeupRouter = require("./routes/makeupRoutes");
const varmalaRouter = require("./routes/varmalaRoutes");
const photoVideoRouter = require("./routes/photoVideoRoutes");
const bookingDetailRoutes = require("./routes/bookingDetailRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const panditRoutes = require("./routes/panditRoutes");

var app = express();

// Connecting to MongoDB
require("./Model/db");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// using Routes
app.use("/megma", indexRouter);
app.use("/megma", eventRoutes);
app.use("/megma", eventDetailRoutes);
app.use("/megma", locationRouter);
app.use("/megma", CategoriesRouter);
app.use("/megma", venueRouter);
app.use("/megma", djBandRouter);
app.use("/megma", decorationRouter);
app.use("/megma", tentHouseRouter);
app.use("/megma", travelRouter);
app.use("/megma", makeupRouter);
app.use("/megma", varmalaRouter);
app.use("/megma", photoVideoRouter);
app.use("/megma", bookingDetailRoutes);
app.use("/megma", walletRoutes);
app.use("/megma", transactionRoutes);
app.use("/megma", panditRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
