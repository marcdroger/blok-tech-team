// Controller updates model
require('dotenv').config();

const express = require('express');
const sessions = require('express-session');
const nodemailer = require('nodemailer');
const getStudents = require('./modules/getStudent');
const searchStudent = require('./modules/searchStudent')
const addStudent = require('./modules/addStudent')
const updateStudent = require('./modules/updateStudent')
const { body, validationResult } = require('express-validator');

const router = express();

let hideNav;
let userId;
let session;

//create session with secret from environment variable
router.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
}));

//render index page
router.get('/', async (req, res) => {
  const students = await getStudents()

  //hide the nav on this page
  hideNav = true;

  //if user clicks on logo then destroy session
  req.session.destroy();

  try {
    res.render('index', {
      student: students,
      hideNav
    });
  } catch (error) {
    console.log(`Rendering index page failed ${error}`)
  }
})

//get userid from index form and store in session
router.post('/userselect', (req, res) => {
  userId = req.body.userid;

  if(userId) {
    session = req.session;
    session.userid = userId;

    res.redirect('/matches');
  } else {
    res.redirect('/');
  }
});

//get userid from account and get student data from DB using the id
router.get('/account', async (req, res) => {
  userId = session.userid;

  const student = await searchStudent(userId)
  res.render('account', {
    userData: student
  });
})

router.get('/matches', async (req, res) => {
  userId = session.userid;

  //get all students
  const students = await getStudents()

  //get student with id from session
  const mainUser = await searchStudent(userId);

  //Create new list which filters out the student by the id from the session.
  //this prevents the selected user showing up in the matches
  const updatedList = students.filter(item => item._id != userId);

  try {
    res.render('matches', {
      student: updatedList, mainUser
    });
  } catch (error) {
    console.log(`Rendering matches page failed ${error}`)
  }
})

router.get('/add', async(req, res) => {
  //hide the nav on this page
  hideNav = true;

  res.render("add", { hideNav });
})

// express validator: checks email, invalid numbers and symbols, length of input after account add submit
router.post('/add',
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address, please try again'),
  body('education').isLength({ min: 2, max: 60 }).withMessage('Education has a minimum of 2 characters, and a maximum of 60'),
  body('school').isLength({ min: 4, max: 60 }).withMessage('Current school has a minimum of 4 characters, and a maximum of 60'),

  async(req, res) => {
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
}});


//update user based on id submitted
router.post('/update', async (req, res) => {
  updateStudent({_id: req.body.id}, req.body) ? res.redirect('/account') : res.redirect('/404')
});

//render 404 page !Keep as last route!
router.use((req, res) => {
  res.status(404).render('404');
})

module.exports = router