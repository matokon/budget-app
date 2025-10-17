const bcrypt = require('bcryptjs');

function compare(plain, digest) {
  return bcrypt.compare(plain, digest);
}

module.exports = { compare };
