// Controller updates model

const express = require('express');
const getStudents = require('./modules/getStudent');
const router = express();

//render index page
router.get('/', async (req, res) => {
  const students = await getStudents()
  try {
    res.render('index', {
      student: students
    });  
  } catch (error) {
    console.log(`Rendering index page failed ${error}`)
  }
  
})

router.get('/account', (req, res) => {
  res.render('account');
})

router.get('/overview', (req, res) => {
  res.render('overview')
})

//render 404 page
router.use((req, res) => {
  res.status(404).render('404');
})


module.exports = router