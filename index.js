
let express = require('express');
let app = express();
const path = require('path');
let nodemailer = require('nodemailer');
const headerEmail = 'webreznov.landing@gmail.com';

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "webreznov.landing@gmail.com", // generated ethereal user
    pass: "rez391)M", // generated ethereal password
  },
});

// verifying the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log('Ooopps!')
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

app.post('/sendmailer', function(req, res) {
  var message = req.param('message')
  var content = message

  var mail = {
    from: headerEmail, 
    to: headerEmail, 
    subject: 'nodemailer check send',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.send('error nodemailer sendMail func')
      res.json({
        status: 'error oops'
      })
    } else {
      res.send('alright');
      res.json({
       status: 'success'
      })
    }
  })
});

const PORT = process.env.PORT || 1234
app.listen(PORT, () => console.info(`server has started on ${PORT}`))
