const bcrypt = require('bcryptjs');

function hash(value, saltRounds = 12) {
  return bcrypt.hash(value, saltRounds);
}

module.exports = { hash };
