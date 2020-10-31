
let express = require('express');
let app = express();
const path = require('path');
let nodemailer = require('nodemailer');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

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

// app.get('/', function(req, res) {
//   res.send('hello world');
// });

// app.get('/test-nodemailer', function(req, res) {
//   var email = 'sharkercool@mail.ru'
//   var message = 'text test nodemailer check this'
//   var content = `email: ${email} \n message: ${message} `

//   var mail = {
//     from: 'webreznov.landing@gmail.com', 
//     to: 'sharkercool@mail.ru', 
//     subject: 'nodemailer check send',
//     text: 'Hi bro this is test nodemailer'
//   }

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.send('error nodemailer sendMail func')
//       res.json({
//         status: 'error oops'
//       })
//     } else {
//       res.send('alright');
//       res.json({
//        status: 'success'
//       })
//     }
//   })
// });

// app.post('/sendmailer', (req, res, next) => {
//   transporter.sendMail({
//     from: 'webreznov.landing@gmail.com', 
//     to: 'sharkercool@mail.ru', 
//     subject: 'nodemailer check send',
//     text: 'Hi bro this is test nodemailer'
//   }, (err, data) => {
//     if (err) {
//       res.send('error nodemailer sendMail func')
//       res.json({
//         status: 'error oops'
//       })
//     } else {
//       res.send('alright');
//       res.json({
//        status: 'success'
//       })
//     }
//   })
// })

app.post('/sendmailer', (req, res, next) => {
  transporter.sendMail({
    from: req.body.email, 
    to: 'webreznov.landing@gmail.com', 
    subject: 'nodemailer check send',
    text: req.body.message
  }, (err, data) => {
    if (err) {
      res.json({
        status: 'fail. Sorry, mail not send'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})


const PORT = process.env.PORT || 1234
app.listen(PORT, () => console.info(`server has started on ${PORT}`))
