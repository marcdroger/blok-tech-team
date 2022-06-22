const express = require('express');
const matches = new express.Router();
const getStudents = require('../controller/modules/getStudent');
const searchStudent = require('../controller/modules/searchStudent')

matches.get('/matches', async (req, res) => {
  userId = session.userid;
  const students = await getStudents()
  //get student with id from session
  const mainUser = await searchStudent(userId);

  //Create new list which filters out the student by the id from the session.
  const updatedList = students.filter(item => item._id != userId);
  try {
    res.render('matches', {
    student: updatedList, mainUser
    });
  } catch (error) {
      console.log(`Rendering matches page failed ${error}`)
  }
})

module.exports = matches