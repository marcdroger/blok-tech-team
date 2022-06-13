// Controller updates model

const express = require('express');
const router = express();

//render index page
router.get('/', (req, res) => {
  res.render('index');
})

//render 404 page
router.use((req, res) => {
  res.status(404).render('404');
})


module.exports = router