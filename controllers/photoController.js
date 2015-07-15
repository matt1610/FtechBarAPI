

var Photo = require('../models/photo.js');

// Post
exports.postPhoto = function(req, res) {

	var photo = new Photo();

	if (req.body.country) {
		photo.country = req.body.country.toLowerCase();
	};
	
	photo.state = req.body.state.toLowerCase();
	photo.break = req.body.break.toLowerCase();
	photo.city = req.body.city.toLowerCase();
	photo.comment = req.body.comment;
	photo.src = req.body.src;
	photo.date = req.body.date;
	photo.user = req.body.user;
	photo.weather = req.body.weather;



	photo.save(function(err) {
		if (err) {
			res.send(err);
		};
		res.json({success : true, message : 'Photo added succesfully'});
	})

};

exports.deletePhoto = function(req, res) {
	Photo.find({ _id : req.body._id }).remove().exec(function(response) {
		res.json(response);
	});
}


// Get
exports.getPhotos = function(req, res) {

	var reg = req.body.value;

	if (req.body.type == 'Search') {
		Photo.find().or(
			[
				{ 'state': { $regex: reg }},
				{ 'break': { $regex: reg }},
				{ 'city': { $regex: reg }}
			])
			.limit(20)
			.exec(function(err, data) {
		    	res.json(data);
			});
	} else {
		var query = {};
		query[req.body.criteria] = req.body.value;

		console.log(query);

		// Get all
		Photo.find(query).limit(20).exec(function(err, data) {
			res.json(data);
		});
	}

	

	
	

};