const mongoose = require('mongoose');
const studentSchema = require('../schema/student')
const studentModel = mongoose.model('students', studentSchema)

async function getStudents() {
    // lean() transformeert mongoose object naar json object
    // laad in alle studenten
  const students = await studentModel.find().lean()

  return students
}

module.exports = getStudents