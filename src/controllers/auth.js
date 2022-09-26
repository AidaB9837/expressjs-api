const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helpers");

async function authRegisterController(req, res) {
  //get username, password, email from body request
  const { email } = req.body;

  //check if email already exist in DB
  const userDB = await User.findOne({ email });

  //if this data already exist in DB send 400 status code - Bad Request with a specific message
  if (userDB) {
    res.status(400);
    res.send({ msg: "User already exists!" });
  }
  //else, register this data in new User record & send 201 status code - Created
  else {
    /*set a new variable with function to hashing pw that have like a params 
  the password from body*/
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await User.create({ password, email });
    res.send(201);
  }
}

module.exports = { authRegisterController };
