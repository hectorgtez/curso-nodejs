const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

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

        const jwtoken = jwt.sign({
          _id: data._id,
          name: data.name,
          email: data.email
        }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });

        res.json({
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
          },
          jwtoken,
        });
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
