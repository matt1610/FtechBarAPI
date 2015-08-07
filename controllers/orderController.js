



var User = require('../models/user.js');

exports.getBills = function(req, res) {
  User.find().exec(function(err, data) {
    res.json(data);
  });
}

exports.payBill = function( req, res ) {
  User.update({email : req.body.email}, {$set : {orders : []}}).exec(function(err, users) {
    if (err) {
      res.json({success : false, message : err});
    } else{
       res.json({success : false, message : 'Bill cleared'});
    }
  });
}

exports.placeOrder = function( req, res ) {

  User.find({email : req.body.Name.email}).limit(1).exec(function(err, users) {
    if (err) {
      console.log(err);
    };
    if (users.length) {
      var theUser = users[0];

      var total = 0;

      for (var i = 0; i < req.body.Cart.length; i++) {
        var item = req.body.Cart[i];
        theUser.orders.push(item);
        total += parseFloat(item.price);
      };

      theUser.save(function(err) {
        if (err) {
          res.json({success : err});
        } else {
          res.json({success : true, message : 'Order saved', total : total, name : req.body.Name.name});
        }
      });

    } else {

      var total = 0;
      var temp = [];
      for (var i = 0; i < req.body.Cart.length; i++) {
        var item = req.body.Cart[i];
        temp.push(item);
        total += parseFloat(item.price);
      };

      var newUser = new User({
        name : req.body.Name.name,
        email : req.body.Name.email,
        orders : temp
      });

      newUser.save(function(err) {
        if (err) {
          res.json({success : false, message : err});
        } else {
          res.json({success : true, message : 'User created and order stored.',total : total, name : req.body.Name.name});
          console.log('User Created');
        }
      });

      
    }
    
  });

};