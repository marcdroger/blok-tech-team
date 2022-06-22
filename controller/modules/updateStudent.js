const studentSchema = require('../schema/student')
const mongoose = require('mongoose')
const student = mongoose.model('students', studentSchema)

async function updateStudent(userId, newData) {
  try {
    await student.findOneAndUpdate(userId, newData)
    console.log('User updated')
    return true
  } catch (error) {
    console.warn('updating user failed',error)
    return false
  }
}


module.exports = updateStudent