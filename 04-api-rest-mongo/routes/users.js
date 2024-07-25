const express = require('express');
const User = require('../models/user_model');
const router = express.Router();

router.get('/', (req, res) => {
  let result = listActiveUsers()
    .then( users => {
      res.json(users);
    })
    .catch( err => {
      res.status(400).json({ error: err });
  });
});

router.post('/', (req, res) => {
  let body = req.body;
  let result = createUser(body);

  result
    .then( user => {
      res.json({ value: user });
    })
    .catch( err => {
      res.status(400).json({ error: err });
    });
});

router.put('/:email', (req, res) => {
  let body = req.body;
  let result = updateUser(req.params.email, body);

  result
    .then( user => {
      res.json({ value: user });
    })
    .catch( err => {
      res.status(400).json({ error: err });
    });
});

router.delete('/:email', (req, res) => {
  let result = deactivateUser(req.params.email);

  result
    .then( user => {
      res.json({ value: user });
    })
    .catch( err => {
      res.status(400).json({ error: err });
    });
});

// Functions

async function listActiveUsers() {
  return await User.find({ 'state': true });
}

async function createUser(body) {
  let user = new User({
    email: body.email,
    name: body.name,
    password: body.password,
  });

  return await user.save();
}

async function updateUser(email, body) {
  let user = await User.findOneAndUpdate(email, {
    $set: {
      name: body.name,
      password: body.password,
    }
  }, { new: true });

  return user;
}

async function deactivateUser(email) {
  let user = await User.findOneAndUpdate(email, {
    $set: {
      state: false
    }
  }, { new: true });

  return user;
}

module.exports = router;
