const express = require('express');
const router = express.Router();
var request = require("request");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

/*
  Create Express server && Express Router configuration.
*/
const app = express();
//app.use(bodyParser.json()); 
app.use(bodyParser.json());
app.use('/mail', router);


/*
  POST /images
*/
router.post('/', (req, res) => {
  console.log(req);
  console.log(req.body);
//  var to = req.body["to"];
  console.log("get post req");
  

  
  var from_mail = "lifeshot.maker@gmail.com";
  var from_pass = "lifeShot1234";


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from_mail,
      pass: from_pass
    }
  });

  var mailOptions = {
    from: 'LifeShotMaker',
    to: recv,
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.sendStatus(201);
    }
  });

});

app.listen(1237, () => {
  console.log("App listening on port 1237!");
});