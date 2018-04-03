const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const config = require('./config.json');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});

const app = express();

app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
});

app.use('/callback', bodyParser.urlencoded({
  extended: true
}));

app.post('/callback', (req, res, next) => {
  console.dir(req.body);

  if (!req.body || !req.body.phone) return

  const mailOptions = {
    from: 'acula22info@gmail.com', // sender address
    to: 'andrushkov.konstantin@gmail.com', // list of receivers
    subject: 'New request', // Subject line
    html: `We get new request phone: ${req.body.phone}`// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log("Error send phone", err)
    else
      console.log("Success send phone", info);
  });

});

app.listen(port);
console.log('Server started!');