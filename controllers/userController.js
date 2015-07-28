

var Admin = require('../models/admin.js');

exports.postUsers = function(req, res) {

  console.log(req.body);

  var admin = new Admin({
    name: req.body.username,
    password: req.body.password,
    email : req.body.email
  });
  
  admin.save(function(err) {
    if (err) {
      // res.send(err);
      console.log(err);
      res.json({ message: 'This username already exists', success : false });
    } else{
      res.json({ message: 'Welcome to Bar App', success : true });
    }
      

    
  });
};



exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};