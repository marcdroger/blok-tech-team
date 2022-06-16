const mongoose = require('mongoose')
const Double = require('@mongoosejs/double');

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

module.exports = studentSchema;