var mongoose = require('mongoose');

var BreakPhoto = new mongoose.Schema({
	country : String,
	state : String,
	break : String,
	city : String,
	comment : String,
	src : String,
	date : String,
	user : String,
	weather : []
});

module.exports = mongoose.model('BreakPhoto', BreakPhoto);