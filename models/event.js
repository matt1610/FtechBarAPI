

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
});


module.exports = mongoose.model('Event', EventSchema);