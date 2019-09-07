var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

/* Conexion a mongo y el login de usuario */
var session = require('express-session');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var mongostore = require('connect-mongo')(session);


// conectar con mongo...
mongoose.connect("mongodb://localhost:27017/DDW", { useNewUrlParser: true, promiseLibrary: bluebird});

// obtenemos en una variable la conexion...
var db = mongoose.connection;

// seteamos los eventos de conexion.
db.on("error", console.error.bind(console, "mongodb connection error"));
db.once("open", function(){
  console.log('conectado a mongo en localhost:27017');
});


/* Fin Conexion a mongo y el login de usuario */


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
