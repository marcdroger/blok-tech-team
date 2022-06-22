require('dotenv').config();

const mongoose = require('mongoose');

//Environment variables
const url = process.env.DB_URI;
const databaseName = process.env.DB_DATABASE;

const connectDB = async () => {
  try {
    mongoose.connect(
      url,{
        dbName: databaseName,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    );
  }catch (error) {
    console.log(`an error occured: ${error}`)
  }
}

module.exports = connectDB