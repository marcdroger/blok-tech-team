const express = require('express');
const index = new express.Router();
const sessions = require('express-session');
const getStudents = require('../controller/modules/getStudent');
const searchStudent = require('../controller/modules/searchStudent');

let session;
let userId;

//create session with secret string from .env variable
index.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
}));

index.get('/', async (req, res) => {
  const students = await getStudents()

  //if user clicks on logo then destroy session
  req.session.destroy();

  try {
    res.render('index', {
      student: students });
    } catch (error) {
      console.log(`Rendering index page failed ${error}`)
    }
})

//get userid from the form and puts userid in the session
index.post('/userselect', (req, res) => {
    userId = req.body.userid;

    if(userId) {
      session = req.session;
      session.userid = userId;

      res.redirect('/matches');
    } else {
      res.redirect('/');
    }
  });

//get account information from user by using the userid stored in session
index.get('/account', async (req, res) => {
    userId = session.userid;

    const student = await searchStudent(userId)
    res.render('account', {
      userData: student
    });
  })

  index.get('/matches', async (req, res) => {
    userId = session.userid;

    //get all students
    const students = await getStudents()

    //get student with id from session
    const mainUser = await searchStudent(userId);

    //Create new list which filters out the student by the id from the session.
    const updatedList = students.filter(item => item._id != userId);
    try {
      res.render('matches', {
      student: updatedList, mainUser
      });
    } catch (error) {
        console.log(`Rendering matches page failed ${error}`)
    }
  })

module.exports = index