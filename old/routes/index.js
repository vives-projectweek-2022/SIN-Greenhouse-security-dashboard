const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Greenhouse'
  })
})

router.post('/', function (req, res, next) {
  data = req
  const container = document.querySelector('.grid-container')
  container.innerHTML = data
})

module.exports = router
