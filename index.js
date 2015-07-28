var express = require('express');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var cors = require('cors');
var bodyParser = require('body-parser');

var photoController = require('./controllers/photoController.js');
var userController = require('./controllers/userController.js');
var authController = require('./controllers/authController.js');
var orderController = require('./controllers/orderController.js');
var itemController = require('./controllers/itemController.js');
var eventController = require('./controllers/eventController.js');
var emailController = require('./controllers/emailController.js');

var passport = require('passport');

var DBURI = 'mongodb://ftechbar:ftechbar@ds036698.mongolab.com:36698/firsttechbar';
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
app.use(express.static(__dirname + '/pages'));

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));

app.use(cors());

app.use(passport.initialize());
var router = express.Router();

app.post('/newAdmin', userController.postUsers);
app.post('/loginAdmin', authController.isAuthenticated, function(req, res) {
	res.json({message : 'Logged In', success : true});
});

app.post('/newItem', itemController.newItem);
app.post('/newEvent', eventController.newEvent);

app.post('/placeOrder', orderController.placeOrder);
app.get('/getBills', orderController.getBills);

app.get('/getCustomEventUsers', eventController.getCustomEventUsers);
app.get('/getMenu', itemController.getMenu);

app.post('/sendMail', authController.isAuthenticated, emailController.sendEmail);

app.get('/test', function(req, res) {
	res.send({isOn : true});
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/pages/index.html');
});

app.get('/createAdmin', function(req, res) {
  res.sendFile(__dirname + '/pages/newAdmin.html');
});

app.listen(process.env.PORT || 5000);
console.log('Running on :5000');















