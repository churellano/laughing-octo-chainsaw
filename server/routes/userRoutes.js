'use strict';

var express = require('express');
var router = express.Router();

const {
  findUserByUsername,
  findUserByEmail
} = require('../queries/UserQueries');

/* GET User by username. */
router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const User = await findUserByUsername(username);

  console.log(username, User);
  User ? res.send(User) : res.sendStatus(404);
});

/* GET availability of username. */
router.get('/isUsernameAvailable/:username', async (req, res) => {
  const username = req.params.username;
  const User = await findUserByUsername(username);

  console.log('isUsernameAvailable', username, User);
  res.send(!User);
});

/* GET availability of email. */
router.get('/isEmailAvailable/:email', async (req, res) => {
  const email = req.params.email;
  const User = await findUserByEmail(email);

  console.log('isEmailAvailable', email, User);
  res.send(!User);
});

module.exports = router;
