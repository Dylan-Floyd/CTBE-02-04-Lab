const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET || 'CHANGEMENOW';

const hashPassword = password => bcrypt.hashSync(password, 8);
const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);

const sign = profile => {
  return jwt.sign({ id: profile.id }, APP_SECRET);
};

const verify = token => {
  return jwt.verify(token, APP_SECRET);
};

module.exports = {
  hashPassword,
  checkPassword,
  sign,
  verify
};
