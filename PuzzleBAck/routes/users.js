var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');

var Puzzle = require('../models/puzzle');
var userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.route('/')
.get((req, res, next) => {
	Puzzle.find({})
	.then((puzzle) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(puzzle);
	}, (err) => next(err))
	.catch((err) =>  next(err));
})
.post((req, res, next) => {
	Puzzle.create(req.body)
	.then((puzzle) => {
		var token = authenticate.getToken({_id: req.body._id});
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({success: true, token: token, status: 'You are successfully logged in!'})
	}, (err) => next(err))
	.catch((err) =>  next(err));
})
.put((req, res, next) => {
	Puzzle.find({name: req.body.name})
	.then((puzzle) => {
		console.log(puzzle);
		var puzz = Puzzle(puzzle[0]);
		puzz.points = req.body.points;
		puzz.time_taken = req.body.time_taken;
		puzz.save()
			.then((puzzle) => {
				console.log(puzzle);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(puzzle);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
});

module.exports = userRouter;
