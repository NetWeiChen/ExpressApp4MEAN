"use strict";
var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();
var helper = require('./Scripts/apps/utility/helper');
// enable dynatrace only in DEV,SDF, IST and PROD.Dynatrace should be initialized in the beginning of the program
if (undefined != process.env['NODE_ENV']) {
}
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
var stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//ignore self signed certificate error node.js soap.js
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// development only
if ('development' == app.get('env')) {
    //app.use(express.errorHandler());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See 
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');
//Initialize the sicModule with data from Fiber service
app.configure(function () {
    //Set the Process Timezone to UTC timezone
    //process.env.TZ = 'UTC';
    helper.SetHostName(require('os').hostname());
});
//****************mongo start***************
var bodyParser = require('body-parser');
//var mongoOps = require('./Scripts/apps/mongoOperation/MongoService');
var mongoModule = require('./Scripts/apps/mongoOperation/MongoService');
app.use(bodyParser());
app.get('/api/movies', function (req, res, next) {
    mongoModule.fetch(req, res);
});
app.get('/api/singlemovies/:name', function (req, res, next) {
    mongoModule.getSpecificMovie(req, res);
});
app.get('/api/updatemovies/:name', function (req, res, next) {
    mongoModule.updateSpecificMovie(req, res);
});
app.get('/api/addmovies', function (req, res, next) {
    var newMovie = req.body;
    if (!newMovie) {
        newMovie = {
            name: "honeymoon",
            director: "steven",
            actress: "elithbeth",
            releaseDate: new Date()
        };
    }
    req.body = newMovie;
    mongoModule.addNewMovie(req, res);
});
//************** mongo end *****************
//// start server on the specified port and binding host
app.listen(parseInt(app.get('port')), '0.0.0.0', function () {
    // print a message when the server starts listening
    helper.LogInfo("server starting on " + app.get('port'));
});
//# sourceMappingURL=app.js.map