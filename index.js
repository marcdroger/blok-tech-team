const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const mainController = require('./controller/mainController');
const connectDB = require('./model/connectionDB');

//configure port for heroku & local
const port = process.env.PORT || 3000;

//use public folder
app.use(express.static('public'));

//use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set templating to pug
app.set('view engine', 'pug');

// Route to mainController
app.use('/', mainController);

app.use(cookieParser());

connectDB()

//listen on port
app.listen(port, () => {
  console.log(`express running on port ${port}`);

  //check if mongoDB connection succes
  connectDB().then(console.log('Connected to MongoDB'));
})
