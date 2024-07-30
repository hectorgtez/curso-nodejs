const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user_model');

const router = express.Router();

router.post('/login', (req, res) => {
  let body = req.body;
  User.findOne({ email: body.email })
    .then( data => {
      if (data) {
        const validPassword = bcrypt.compareSync(body.password, data.password);

        if (!validPassword) return res(400).json({
          error: 'ok',
          msg: 'Usuario o contraseña incorrecta...'
        })

        res.json(data);
      } else {
        res.status(400).json({
          error: 'ok',
          msg: 'Usuario o contraseña incorrecta...'
        })
      }
    })
    .catch( err => res.status(400).json({
      error: 'ok', error: err
    }));
});

module.exports = router;
