

var Item = require('../models/item.js');

exports.newItem = function(req, res) {

  var item = new Item({
    name: req.body.name,
    price: parseFloat(req.body.price)
  });
  
  item.save(function(err) {
    if (err) {
      res.json({ message: 'This item already exists', success : false });
    } else{
      res.json({ message: 'New Menu Item Added', success : true });
    }
    
  });
};



exports.getMenu = function(req, res) {
  Item.find(function(err, items) {
    if (err)
      res.send(err);

    res.json({success : true, menu : items});
  });
};