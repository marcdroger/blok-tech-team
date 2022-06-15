const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    education: String,
    currentSchool: String,
    countryPreference: String,
    email: String,
    latitude: Double,
    longitude: Double
  }
);

const student = mongoose.model('student', studentSchema)

module.exports = student;