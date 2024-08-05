const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const User = require('../models/user_model');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(10)
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
});

router.get('/', verifyToken, (req, res) => {
  let result = listActiveUsers();

  result
    .then( users => {
      res.json(users);
    })
    .catch( err => {
      res.status(400).json({ error: err });
  });
});

router.post('/', (req, res) => {
  let body = req.body;

  User.findOne({ email: body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ error: 'Server error...' });
    }
    
    if (user) {
      res.status(400).json({ msg: 'El usuario ya existe...' });
    }
  });

  const { error, value } = schema.validate({
    name: body.name,
    email: body.email,
  });

  if (!error) {
    let result = createUser(body);
  
    result
      .then( user => {
        res.json({
          name: user.name,
          email: user.email
        });
      })
      .catch( err => {
        res.status(400).json({ error: err });
      });
    } else {
      res.status(400).json({ error });
    }
});

router.put('/:email', verifyToken, (req, res) => {
  let body = req.body;

  const { error, value } = schema.validate({
    name: body.name,
  });

  if (!error) {
    let result = updateUser(req.params.email, body);
  
    result
      .then( user => {
        res.json({
          name: user.name,
          email: user.email
        });
      })
      .catch( err => {
        res.status(400).json({ error: err });
      });
  } else {
    res.status(400).json({ error });
  }

});

router.delete('/:email', verifyToken, (req, res) => {
  let result = deactivateUser(req.params.email);

  result
    .then( user => {
      res.json({
        name: user.name,
        email: user.email
      });
    })
    .catch( err => {
      res.status(400).json({ error: err });
    });
});

// Functions

async function listActiveUsers() {
  return await User.find({ 'state': true })
    .select({ nombre: 1, email: 1 });
}

async function createUser(body) {
  let user = new User({
    email: body.email,
    name: body.name,
    password: bcrypt.hashSync(body.password, 10),
  });

  return await user.save();
}

async function updateUser(email, body) {
  let user = await User.findOneAndUpdate({ 'email': email }, {
    $set: {
      name: body.name,
      password: body.password,
    }
  }, { new: true });

  return user;
}

async function deactivateUser(email) {
  let user = await User.findOneAndUpdate({ 'email': email }, {
    $set: {
      state: false
    }
  }, { new: true });

  return user;
}

module.exports = router;
