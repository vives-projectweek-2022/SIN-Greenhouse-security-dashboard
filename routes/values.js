const express = require('express')
const router = express.Router()

/* GET values. */
router.get('/', function(req, res, next) {
  res.send({
    // temp: topic;
  })
})

module.exports = router
