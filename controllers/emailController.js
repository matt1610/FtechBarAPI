
var nodemailer = require('nodemailer');

exports.sendEmail = function(req, res) {

  // console.log(req.body.email);
  // return;

  var transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
          user: 'matt1610',
          pass: 'Element@12'
      }});

  var mailOptions = {};

  mailOptions.from = 'noreply@firsttechbarapp.co.za';
  mailOptions.to = req.body.email;
  mailOptions.subject = 'Your Bar Bill';

  var total = 0;
  for (var i = 0; i < req.body.orders.length; i++) {
    total += parseFloat(req.body.orders[i].price);
  };
  total = total.toFixed(2);

  var emailHTML = '<h2>Heya, '+req.body.name+', Your bar total for this month: R'+total+'</h2>';
  emailHTML += '<table cellspacing="0" cellpadding="8" border="0" width="100%">';
  for (var i = 0; i < req.body.orders.length; i++) {
    emailHTML += AddRow(req.body.orders[i], i);
  };
  emailHTML += '</table>';

  mailOptions.html = emailHTML;

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log(err);
    };
    console.log('Message Sent : ' + info.response);
    res.json({success : true, message : info.response});
  });
  
};


function AddRow(order, index) {
  var bg,colour;
  index % 2 > 0 ? bg = '#ecf0f1' : bg = '#bdc3c7';
  index % 2 > 0 ? colour = '#34495e' : colour = '#34495e';
  return '<tr style="background: '+bg+'; border-radius: 5px;"><td width="50%" style="color:'+colour+'">'+order.name+'</td><td width="50%" style="color:'+colour+'">R'+order.price+'</td></tr>';
}

