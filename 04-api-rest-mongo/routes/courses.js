const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('GET Courses ready!');
});

module.exports = router;
