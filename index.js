var express = require('express');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var cors = require('cors');
var bodyParser = require('body-parser');
var photoController = require('./controllers/photoController.js');
var userController = require('./controllers/userController.js');
var authController = require('./controllers/authController.js');
var advertController = require('./controllers/advertController.js');
var passport = require('passport');

var DBURI = 'mongodb://mattstarkey:element12@ds031922.mongolab.com:31922/wavehunter';
var mongooseURI = uriUtil.formatMongoose(DBURI);

mongoose.connect(mongooseURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use(passport.initialize());
var router = express.Router();

router.route('/photos').post(authController.isAuthenticated, photoController.postPhoto);
router.route('/getphotos').post(authController.isAuthenticated, photoController.getPhotos);
router.route('/users').post(userController.postUsers);
router.route('/adverts').post(advertController.getAdvert);
router.route('/delete').post(photoController.deletePhoto);

app.use('/api', router);

app.get('/test', function(req, res) {
	res.send({isOn : true});
});

app.listen(process.env.PORT || 5000);
console.log('Running on :5000');