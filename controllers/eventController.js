

var Event = require('../models/event.js');

exports.newEvent = function(req, res) {

  var eventUser = new Event({
    name: req.body.name,
    email : req.body.email
  });
  
  eventUser.save(function(err) {
    if (err) {
      // res.send(err);
      console.log(err);
      res.json({ message: 'This username already exists', success : false });
    } else{
      res.json({ message: 'Event User Created', success : true });
    }
      

    
  });
};



exports.getCustomEventUsers = function(req, res) {
  Event.find(function(err, eventUsers) {
    if (err)
      res.send(err);

    res.json({success : true, eventUsersList : eventUsers});
  });
};