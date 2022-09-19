const bcrypt = require("bcryptjs");

//function to hashing password
function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

module.exports = { hashPassword };
