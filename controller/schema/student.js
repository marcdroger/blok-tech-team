const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    education: String,
    currentSchool: String,
    countryPreference: String,
    email: String,
  }
);

module.exports = studentSchema;