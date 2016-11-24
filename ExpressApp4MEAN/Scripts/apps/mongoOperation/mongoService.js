"use strict";
var fs = require('fs');
var helper = require('../utility/helper');
var jsonQuery = require('json-query');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/moviesDb');
var db = mongoose.connection;
var hotMovieSchema = mongoose.Schema({
    name: String,
    director: String,
    actress: String,
    releaseDate: Date
});
var hotMovieModel = mongoose.model('hotMovie', hotMovieSchema);
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function () {
    console.log("hotMovieDb is open");
    hotMovieModel.find().exec(function (error, results) {
        if (results.length === 0) {
            hotMovieModel.create({ name: "spooky house", director: "wei", actress: "arina", releaseDate: new Date() });
        }
    });
});
function fetch(request, response) {
    console.log("fetching movies data ...");
    hotMovieModel.find().exec(function (err, res) {
        if (err) {
            response.send(500, { error: err });
        }
        else {
            response.send(res);
        }
    });
}
exports.fetch = fetch;
function addNewMovie(request, response) {
    console.log("adding new movie...");
    var newMovie = {
        name: "honeymoon",
        director: "steven",
        actress: "elithbeth",
        releaseDate: new Date()
    };
    hotMovieModel.create(newMovie, function (err, data) {
        if (err) {
            response.send(500, { error: err });
        }
        else {
            response.send(data);
        }
    });
}
exports.addNewMovie = addNewMovie;
function updateSpecificMovie(request, response) {
    console.log("update individual movie data ... ");
    try {
        var query = { name: request.params.name };
        hotMovieModel.findOneAndUpdate(query, { actress: 'fiona' }).exec(function (err, hotmovie) {
            if (err) {
                response.send(500, { error: err });
            }
            else {
                response.send(hotmovie);
            }
        });
    }
    catch (err) {
        helper.logError(JSON.stringify(err.stack));
        response.status(500).send({ error: "Internal server error" });
    }
}
exports.updateSpecificMovie = updateSpecificMovie;
function getSpecificMovie(request, response) {
    console.log("get specific movie ...");
    try {
        var result = hotMovieModel.findOne({ name: request.params.name });
        result.select('name actress director');
        result.exec(function (err, hotmovie) {
            if (err) {
                response.send(500, { error: err });
            }
            else {
                response.send(hotmovie);
            }
            console.log('Now we get hot movie %s %s %s', hotmovie.name, hotmovie.actress, hotmovie.director);
        });
    }
    catch (err) {
        helper.logError(JSON.stringify(err.stack));
        response.status(500).send({ error: "Internal server error" });
    }
}
exports.getSpecificMovie = getSpecificMovie;
function add(request, response) {
    var newHotMovie = { name: request.body.name, director: request.body.director, actress: request.body.actress, releaseDate: request.body.releaseDate };
    hotMovieModel.create(newHotMovie, function (error, resp) {
        if (error) {
            response.send(500, { error: error });
        }
        else {
            response.send({ success: true });
        }
    });
}
exports.add = add;
;
//# sourceMappingURL=mongoService.js.map