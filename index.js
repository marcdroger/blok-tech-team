require('dotenv').config();

const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

//configure port for heroku & local
const port = process.env.PORT || 3000;

//Environment variables
const url = process.env.DB_URI;
const databaseName = process.env.DB_DATABASE;
const collection = process.env.DB_COLLECTION;

let db;

//use public folder
app.use(express.static('public'));

//use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set templating to pug
app.set('view engine', 'pug');

//render index page
app.get('/', async (req, res) => {
  //get students data from mongoDB
  const students = await db.collection(collection).find({},{}).toArray();

  //TODO: students data in index page?

  res.render('index', students);
})

//render 404 page
app.use((req, res) => {
  res.status(404).render('404');
})

//connect to MongoDB database
async function connectDB() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    db = client.db(databaseName);
  } catch (error) {
    throw error;
  }
}

//listen on port
app.listen(port, () => {
  console.log(`express running on port ${port}`);

  //check if mongoDB connection succes
  connectDB().then(console.log('Connected to MongoDB'));
})
