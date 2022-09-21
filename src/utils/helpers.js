const bcrypt = require("bcryptjs");

//function to hashing password
function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

/*function that compares the text of the password sent 
  through our client with the hashed password.
  Then, return any value bcrypt like a boolean:
  - true if the password is hashed
  - else, return false. */
function comparePassword(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

module.exports = { hashPassword, comparePassword };
