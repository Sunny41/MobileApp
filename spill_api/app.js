var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bcryptjs = require('bcryptjs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');

var index = require('./routes/index');
var activities = require('./routes/activities');
var activitymembers = require('./routes/activitymembers');
var groups = require('./routes/groups');
var groupactivities = require('./routes/groupactivities');
var groupmembers = require('./routes/groupmembers');
var invitations = require('./routes/invitations');
var items = require('./routes/items');
var itemsinvited = require('./routes/itemsinvited');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host     : 'cloudws1819.c0lwjxnry6gy.us-east-2.rds.amazonaws.com',
	  	user     : 'mobile',
        password : 'Mobile1234!',
  		database : 'mobileapp'
	});
	connection.connect();
	next();
});

app.use('/', index);
app.use('/activities', activities); //GET all Activities
app.use('/activitymembers', activitymembers); //GET all members of an activity
app.use('/groups', groups); //GET all groups
app.use('/groupactivities', groupactivities); //GET all activities of a group
app.use('/groupmembers', groupmembers); //GET all members of a group
app.use('/invitations', invitations); //GET all invitations
app.use('/items', items); //GET all items
app.use('/itemsinvited', itemsinvited); //GET all items someone has been invited for
app.use('/users', users); //GET all users

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
http.createServer(app).listen(port,host);
