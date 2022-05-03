const express = require('express');

const router = express.Router()

module.exports = router;

//Get all Method
router.get('/getData', (req, res) => {
  res.send(payload)
})

//Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })
