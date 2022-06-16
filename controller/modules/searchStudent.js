// hier komen functies te staan eg. saveData, getData etc.
// elk functie kan zo z'n eigen module krijgen
const mongoose = require('mongoose');
const studentSchema = require('../schema/student')
const studentModel = mongoose.model('students', studentSchema)

async function searchStudent(id) {
    // lean() transformeert mongoose object naar json object
    // laad in alle studenten 
  const students = await studentModel.findById(id).lean()

  return students
}

module.exports = searchStudent