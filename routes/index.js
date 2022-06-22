const express = require('express');
const index = new express.Router();
const sessions = require('express-session');
const getStudents = require('../controller/modules/getStudent');
const searchStudent = require('../controller/modules/searchStudent');

let hideNav;
let session;
let userId;

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

index.post('/userselect', (req, res) => {
    userId = req.body.userid;
    
    if(userId) {
      session = req.session;
      session.userid = userId;
      console.log(req.session);
    
      res.redirect('/matches');
    } else {
      res.redirect('/');
    }
  });

index.post('/userselect', (req, res) => {
  userId = req.body.userid;
  
  if(userId) {
    session = req.session;
    session.userid = userId;
    console.log(req.session);
  
    res.redirect('/matches');
  } else {
    res.redirect('/');
  }
});

index.get('/account', async (req, res) => {
    userId = session.userid;
  
    const student = await searchStudent(userId)
    console.log(student)
    res.render('account', {
      userData: student
    });
  })

module.exports = index