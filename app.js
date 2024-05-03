var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Requiring Routes

var indexRouter = require('./routes/index');
var eventRoutes=require('./routes/eventRoutes');
var locationRouter=require('./routes/locationRoutes');
var CategoriesRouter=require("./routes/categoriesRoutes");



var app = express();

// Connecting to MongoDB
require("./Model/db");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// using Routes
app.use('/', indexRouter);
app.use('/MegmaEvent',eventRoutes);
app.use("/Megmalocation",locationRouter);
app.use("/Megmacategories",CategoriesRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;