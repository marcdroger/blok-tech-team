// Controller updates model
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const getStudents = require('./modules/getStudent');
const searchStudent = require('./modules/searchStudent')
const addStudent = require('./modules/addStudent')
const router = express();
const { body, validationResult } = require('express-validator');

//render index page
router.get('/', async (req, res) => {
  const students = await getStudents()
  console.log(students)
  try {
    res.render('index', {
      student: students
    });
  } catch (error) {
    console.log(`Rendering index page failed ${error}`)
  }

})

// Router param ophalen zodat je de id van een gebruiker kan krijgen.
// deze id gebruik je in een zoekfunctie, wanneer je resultaat terug krijgt
// laat je dit zien getStudent(res.body.urlparamorsomethinglikethis)
router.get('/account', async (req, res) => {
  const userId = req.query.userid
  const student = await searchStudent(userId)
  console.log(student)
  res.render('account', {
    userData: student
  });
})

router.get('/matches', async (req, res) => {
  const students = await getStudents()

  try {
    res.render('matches', {
      student: students
    });
  } catch (error) {
    console.log(`Rendering matches page failed ${error}`)
  }
})

router.get('/add', async(req, res) => {
  res.render("add");
})

// express validator: checks email, invalid numbers and symbols, length of input
router.post('/add', 
body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address, try again'),
body('education').isLength({ min: 2, max: 20 }).withMessage('Education has a minimum of 2 characters, and a maximum of 20'),
body('school').isLength({ min: 4, max: 20 }).withMessage('Current school has a minimum of 4 characters, and a maximum of 20'),


 async(req, res) => { 
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
        success: false,
        errors: errors.array()
    });  

    /*
    if (!errors.isEmpty()) { 
      const alert = errors.array()
      res.render('add', {
        alert: alert
      }) */ 

} 
  const student = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    education: req.body.education,
    currentSchool: req.body.school,
    countryPreference: req.body.country
  }

  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
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
  
  main().catch(console.error);

  addStudent(student);
   res.redirect("/");
})

//render 404 page
router.use((req, res) => {
  res.status(404).render('404');
})


module.exports = router