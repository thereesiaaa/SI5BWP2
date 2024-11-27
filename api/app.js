var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var bukusRouter = require('./app_server/routes/bukus');

// const mongoose = require("mongoose");

require("./app_server/model/db")

//CORS Enabled
//Cross Origin Resource Sharing
var app = express();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, PUT, POST, PATCH, DELETE, OPTIONS");  
  next();
});

//versi 2.2.12
// "mongodb+srv://mdp:BelajarMongo2024@cluster0.n214x.mongodb.net/dbbuku?retryWrites=true&w=majority&appName=Cluster0"
//  "mongodb://mdp:BelajarMongo2024@cluster0-shard-00-00.n214x.mongodb.net:27017,cluster0-shard-00-01.n214x.mongodb.net:27017,cluster0-shard-00-02.n214x.mongodb.net:27017/dbbuku?ssl=true&replicaSet=atlas-107w2z-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

// mongoose.connect(
//   "mongodb://mdp:BelajarMongo2024@cluster0-shard-00-00.n214x.mongodb.net:27017,cluster0-shard-00-01.n214x.mongodb.net:27017,cluster0-shard-00-02.n214x.mongodb.net:27017/dbbuku?ssl=true&replicaSet=atlas-107w2z-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
// ).then(()=>{
//   console.log("Connected to Database");
// }).catch((err)=>{
//   console.error('App starting error:', err.stack);
//   console.log("Connection Failed");
// });

// mongoose.connect(
//   "mongodb://localhost:27017/dbbuku"
// ).then(()=>{
//   console.log("Connected to Database");
// }).catch((err)=>{
//   // console.error('App starting error:', err.stack);
//   console.log("Connection Failed");
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buku', bukusRouter);

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
