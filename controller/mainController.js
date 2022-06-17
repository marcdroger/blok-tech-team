// Controller updates model

const express = require('express');
const getStudents = require('./modules/getStudent');
const searchStudent = require('./modules/searchStudent')
const addStudent = require('./modules/addStudent')
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

router.get('/matches', async (req, res) => {
  const students = await getStudents()

  try {
    res.render('matches', {
      student: students
    });
  } catch (error) {
    console.log(`Rendering matches page failed ${error}`)
  }
})

router.get('/add', async(req, res) => {
  res.render("add");
})

router.post('/add', async(req, res) => {
  const student = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    education: req.body.education,
    currentSchool: req.body.school,
    countryPreference: req.body.country
  }
  addStudent(student);
  res.redirect("/");
})

//render 404 page
router.use((req, res) => {
  res.status(404).render('404');
})


module.exports = router