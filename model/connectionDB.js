// hier komt connectie met database
// model alerts view dat er iets is veranderd

require('dotenv').config();
const mongoose = require('mongoose');

const { MongoClient} = require('mongodb');

//Environment variables
const url = process.env.DB_URI;
const databaseName = process.env.DB_DATABASE;
const collection = process.env.DB_COLLECTION;

let db;

const connectDB = async () => {
  try {
    mongoose.connect(
      url,{
        dbName: databaseName,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    );
    console.log('Connection with database established.');
  }catch (error) {
    console.log(`an error occured: ${error}`)
  }
}

module.exports = connectDB