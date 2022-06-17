// hier komen functies te staan eg. saveData, getData etc.
// elk functie kan zo z'n eigen module krijgen
const mongoose = require('mongoose');
const studentSchema = require('../schema/student')
const studentModel = mongoose.model('students', studentSchema)

async function addStudent(student) {
    await studentModel.create([{
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        education: student.education,
        currentSchool: student.currentSchool,
        countryPreference: student.countryPreference
    }]
)};

module.exports = addStudent