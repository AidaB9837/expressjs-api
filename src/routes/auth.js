const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");

const router = Router();

/*
//endpoint for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //if email or password are null, undefined or empty, send 400 status code - Bad Request
  if (!email || !password) return res.send(400);

  //search user in DB by email
  const userDB = await User.findOne({ email });

  //if the user does not found, send  401 - Unauthorized
  if (!userDB) return res.send(401);

  //
  const isValid = comparePassword(password, userDB.password);

  //if the password is correct
  if (isValid) {
    //to obtain cookies, we attach the obj "user" to the obj "session"
    req.session.user = userDB;
    console.log("Authenticated Successfully!");
    return res.send(200);
  } else {
    console.log("Failed to Authenticate");
    return res.send(401);
  }
});*/

//endpoint for login
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged In");
  res.send(200);
});

//endpoint for register
router.post("/register", async (req, res) => {
  //get username, password, email from body request
  const { email } = req.body;

  //check if email alreday exist in DB
  const userDB = await User.findOne({ email });

  //if this data already exist in DB send 400 status code - Bad Request with a specific message
  if (userDB) {
    res.status(400).send({ msg: "User already exists!" });
  }
  //else, register this data in new User record & send 201 status code - Created
  else {
    /*set a new variable with function to hashing pw that have like a params 
the password from body*/
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await User.create({ username, password, email });
    res.send(201);
  }
});

module.exports = router;
