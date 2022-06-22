const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const connectDB = require('./model/connectionDB');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

//configure port for heroku & local
const port = process.env.PORT || 3000;

const index = require('./routes/index')
const matches = require('./routes/matches');
const addUser = require('./routes/addUser');
const updateUser = require('./routes/update');
const pageNotFound = require('./routes/404');


//use public folder
app.use(express.static('public'));

//use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//set templating to pug
app.set('view engine', 'pug');

app
  .get('/', index)
  .post('/userselect', index) 
  .get('/matches', matches)
  .get('/account', index)
  .get('/add', addUser)
  .post('/add',
      body('email').isEmail().normalizeEmail().withMessage('Must be a valid email address, try again'),
      body('education').isLength({ min: 2, max: 60 }).withMessage('Education has a minimum of 2 characters, and a maximum of 60'),
      body('school').isLength({ min: 4, max: 60 }).withMessage('Current school has a minimum of 4 characters, and a maximum of 60'),
    addUser)
  .post('/update', updateUser)
  .use('/', pageNotFound)

connectDB()

//listen on port
app.listen(port, () => {
  console.log(`express running on port ${port}`);

  //check if mongoDB connection succes
  connectDB().then(console.log('Connected to MongoDB'));
})
