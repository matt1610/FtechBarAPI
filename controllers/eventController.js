

var User = require('../models/user.js');

exports.newEvent = function(req, res) {

  var user = new User({
    name: req.body.name,
    email : req.body.email,
    orders : []
  });
  
  user.save(function(err) {
    if (err) {
      // res.send(err);
      console.log(err);
      res.json({ message: 'This username already exists', success : false });
    } else{
      res.json({ message: 'User Created', success : true });
    }
      

    
  });
};



exports.getCustomEventUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json({success : true, eventUsersList : users});
  });
};