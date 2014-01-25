
/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var fs = require('fs');

var http = require('http');
var path = require('path');

var env = process.env.NODE_ENV || 'dev';
var config = require('./config/config')[env];
var mongoose = require('mongoose');

mongoose.connect(config.db);


var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

var User = mongoose.model('User');
require('./config/passport')(passport, config)

var app = express()
// express.io ?
// var app = express().http().io();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('less-middleware')({dest: __dirname + '/public/css',
        src: __dirname + '/src/less',
        prefix: '/css'}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var mongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');

app.use(function (req, res, next) {
	res.locals.req = req;
	next();
});

var mongoSessionStore = new mongoStore({
	url: config.db,
	collection: 'sessions'
})

app.use(express.session({
	secret: 'thisisasecret',
	store: mongoSessionStore 
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(app.router);

require('./config/routes')(app, passport)


app.listen(3000);
// var server = http.createServer(app);
// var io = require('socket.io').listen(server);
// io.configure(function () {
//   io.set("transports", ['xhr-polling','flashsocket', 'htmlfile', 'jsonp-polling', 'websocket']);
//   io.set("polling duration", 10);
// });
// io.set('log level', 1);
// server.listen(app.get('port'));


