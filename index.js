require('dotenv').config;

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

//use public folder
app.use(express.static('public'));

//use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set templating to pug
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
})

//listen on port
app.listen(port, () => {
  console.log(`express running on port ${port}`);
})
