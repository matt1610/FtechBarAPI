

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var AdminSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password : {
		type : String,
		required : true
	}
});

AdminSchema.methods.verifyPassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) { return cb(err)};
		cb(null, isMatch);
	});
};

AdminSchema.pre('save', function( callback ) {

	var user = this;

	if (!user.isModified('password')) { return callback()};

	bcrypt.genSalt(5, function( err, salt) {
		if (err) return callback(err);

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) { return callback(err)};
			user.password = hash;
			callback();
		})
	});

});

module.exports = mongoose.model('Admin', AdminSchema);