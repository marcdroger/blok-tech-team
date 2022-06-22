const express = require('express');
const addUser = new express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const addStudent = require('../controller/modules/addStudent')

addUser.get('/add', async(req, res) => {
  //hide nav on this page
  hideNav = true;

  res.render("add", { hideNav });
})

addUser.post('/add', async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    const alert = errors.array()
    res.render('add', {
      alert
    })
  } else {
    const student = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      education: req.body.education,
      currentSchool: req.body.school,
      countryPreference: req.body.country
    }

    async function mail() {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        requireTLS:true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls:{
          ciphers:'SSLv3',
          rejectUnauthorized:false
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Tech team 3" <nigelfijnheertest@outlook.com>',
        to: req.body.email,
        subject: "Welcome",
        text: "Your account have been created.",
        html: "<b>Your account details are</b><br>" +
        "<p>Your name: " + req.body.firstname + " " + req.body.lastname +"</p>" +
        "<p>Your education: " + req.body.education + "</p>" +
        "<p>Your school: " + req.body.school + "</p>" +
        "<p>Your preferred country: " + req.body.country + "</p>",
      });

      console.log("Message sent: %s", info.messageId);
    }

    mail().catch(console.error);

    addStudent(student);
    res.redirect("/");
  }
})

module.exports = addUser