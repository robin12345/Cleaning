const express = require('express');
const path = require('path');
const port80 = 80;
const port443 = 443;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const config = require('./config.json');
const fs = require('fs');
const http = require('http');
const https = require('https');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});

const app = express();

const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'sslcert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'sslcert/crt.pem'))
};

const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

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

httpsServer.listen(port443, '151.248.114.226');
httpServer.listen(port80, '151.248.114.226');
console.log('Servers started!');