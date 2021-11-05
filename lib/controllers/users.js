const { Router } = require('express');
const UserService = require('../services/UserService.js');

module.exports = Router()
  .post('/signup', async (req, res) => {
    const { password, username } = req.body;
    const { status, response } = await UserService.signUp(username, password);
    res.status(status).json(response);
  })
  .post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const { status, response } = await UserService.signIn(username, password);
    res.status(status).json(response);
  });
