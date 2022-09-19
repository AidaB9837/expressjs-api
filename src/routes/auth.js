const { Router } = require("express");
const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helpers");

const router = Router();

//endpoint for login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // check if username and password are truthy
  if (username && password) {
    /* if "user" property already exist in the "session" obj,
    the user is already autheticated:*/
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      /*if this "user" session property does not exist,
      the user is not autheticated.
      Then add the "user" property to the "session" obj, 
      and pass the "username" property to the "user" obj:*/
      req.session.user = {
        username,
      };
      res.send(req.session);
    }

    /* if username and password are not truthy,
    send response with code status 401 - Unauthorized*/
  } else res.send(401);
});

//endpoint for register
router.post("/register", async (req, res) => {
  //get username, password, email from body request
  const { username, password, email } = req.body;

  //check if username or email alreday exist in DB
  const userDB = await User.findOne({ $or: [{ username }, { email }] });

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
