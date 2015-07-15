var mongoose = require('mongoose');

var Advert = new mongoose.Schema({
	src : String,
	link : String,
	client : String
});

module.exports = mongoose.model('Advert', Advert);