

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	orders : []
});


module.exports = mongoose.model('User', UserSchema);