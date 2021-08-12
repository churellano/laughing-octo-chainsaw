'use strict';

var express = require('express');
var router = express.Router();

const {
  findUserByUsername,
  findUserByEmail,
  signup,
  login
} = require('../queries/userQueries');

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

/* Signup */
router.post('/signup', async (req, res) => {
  console.log('signup request', req.body);
  const newUser = await signup(req.body);
  res.send(newUser);
});

/* Signup */
router.post('/login', async (req, res) => {
  console.log('login request', req.body);
  const isLoginSuccessful = await login(req.body);
  res.send(isLoginSuccessful);
});

module.exports = router;
