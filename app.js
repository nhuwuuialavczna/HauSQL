var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var home = require('./routes/HomeController');
var users = require('./routes/UserController');
var db = require('./routes/DataBaseController');
var error = require('./routes/ErrorController');

var app = express();
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /publicvzcvzv
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/Users', users);
app.use('/DB', db);
app.use('/Error', error);

module.exports = app;
app.listen(process.env.PORT || 3000);