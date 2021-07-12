'use strict';

var express = require('express');
var router = express.Router();

const { findUser} = require('../queries/UserQueries');

/* GET User by username. */
router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const User = await findUser(username);

  console.log(username, User);
  User ? res.send(User) : res.sendStatus(404);
});

module.exports = router;
