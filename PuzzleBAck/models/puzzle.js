const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuzzleSchema = new Schema({
	name: {
		type: String,
		required: true
	}, 
	points: {
		type: Number
	}, 
	time_taken: {
		type: String
	}
}, {
	timestamps: true
});

var Puzzles = mongoose.model('Puzzle', PuzzleSchema);
 module.exports = Puzzles;