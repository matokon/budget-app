// utils/hash.js
const bcrypt = require('bcryptjs'); // lub: require('bcrypt')

exports.hash = (value, saltRounds = 12) => {
  return bcrypt.hash(value, saltRounds);
};
