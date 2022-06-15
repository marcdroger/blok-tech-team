// Controller updates model

const express = require('express');
const getStudents = require('./modules/getStudent');
const searchStudent = require('./modules/searchStudent')
const router = express();

//render index page
router.get('/', async (req, res) => {
  const students = await getStudents()
  console.log(students)
  try {
    res.render('index', {
      student: students
    });  
  } catch (error) {
    console.log(`Rendering index page failed ${error}`)
  }
  
})

// Router param ophalen zodat je de id van een gebruiker kan krijgen.
// deze id gebruik je in een zoekfunctie, wanneer je resultaat terug krijgt
// laat je dit zien getStudent(res.body.urlparamorsomethinglikethis)
router.get('/account', async (req, res) => {
  const userId = req.query.userid
  const student = await searchStudent(userId)
  console.log(student)
  res.render('account', {
    userData: student
  });
})

router.get('/overview', (req, res) => {
  res.render('overview')
})

//render 404 page
router.use((req, res) => {
  res.status(404).render('404');
})


module.exports = router