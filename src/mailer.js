//const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
//app.use(compression());

const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  provider: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: '',
    pass: ''
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/hello', function (req, res) {

  let senderPrenom = req.body.prenom;
  let senderNom = req.body.nom;
  let senderMail = req.body.mail;
  let senderSociete = req.body.societe;
  let senderMessage = req.body.message;

  let mailOptions = {
    to: 'deshais.armand@gmail.com',
    from: senderMail,
    subject: 'Message sur digiandco.com', 'societe': senderSociete,
    text: senderMessage, "by": senderPrenom, senderNom,
    replyTo: senderMail
  };

  if (senderPrenom === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  if (senderNom === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  if (senderSociete === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  if (senderMessage === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }


  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
});

app.listen(port, function () {
  console.log('Express started on port: ', port);
});
