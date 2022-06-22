const express = require('express');
const matches = new express.Router();
const getStudents = require('../controller/modules/getStudent');

matches.get('/matches', async (req, res) => {
  const students = await getStudents()
  try {
    res.render('matches', {
    student: students
    });
  } catch (error) {
      console.log(`Rendering matches page failed ${error}`)
  }
})

module.exports = matches