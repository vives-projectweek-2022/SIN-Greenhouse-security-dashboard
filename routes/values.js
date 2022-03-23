var express = require('express');
var router = express.Router();

/* GET values. */
router.get('/', function(req, res, next) {
  res.send({
    // temp: topic;
  });
});

module.exports = router;