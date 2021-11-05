const User = require('../models/User.js');
const { hashPassword, checkPassword, sign } = require('../utils/jwt.js');

module.exports = class UserService {
  static async signUp(username, password) {
    const result = {
      status: 200,
      response: {}
    };

    // username and password needs to exist
    if(!username || !password) {
      result.status = 400;
      result.response = { error: 'username and password required' };
      return result;
    }

    // username needs to not exist already
    const foundUser = await User.getByUsername(username);
    if(foundUser) {
      result.status = 400;
      result.response = { error: 'username already exists' };
      return result;
    }

    // username and password are okay, create the user
    const hash = hashPassword(password);
    const savedUser = await User.insertUser(username, hash);

    //return the username and token
    result.response = {
      username,
      token: sign({ id: savedUser.id })
    };
    return result;
  }

  static async signIn(username, password) {
    const result = {
      status: 200,
      response: {}
    };

    // username and password needs to exist
    if(!username || !password) {
      result.status = 400;
      result.response = { error: 'username and password required' };
      return result;
    }

    const foundUser = await User.getByUsername(username);
    const validPass = checkPassword(password, foundUser.hash);
    if(!foundUser || !validPass) {
      result.status = 400;
      result.response = { error: 'username or password incorrect' };
      return result;
    }

    // username and password were valid
    result.response = {
      username,
      token: sign({ id: foundUser.id })
    };
    return result;
  }
};
