var jwt = require('jsonwebtoken');
var config = require('./config.js');
var Puzzle = require('./models/puzzle');

exports.getToken = function(puzzle) {
    return jwt.sign(puzzle, config.secretKey);
};