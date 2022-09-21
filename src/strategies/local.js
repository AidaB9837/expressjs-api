const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schemas/User");
const { comparePassword } = require("../utils/helpers");

//implement function to serializing user (user logged in)
passport.serializeUser((user, done) => {
  console.log("Serializing User...");
  console.log(user);
  done(null, user.id);
});

//implement function to deserializing user (user logged out)
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User...");
  console.log(id);

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }
    console.log(user);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

//Authentication Strategy Logic with Passport
passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);

      try {
        //if both fields are not entered, it throw error!
        if (!email || !password) {
          throw new Error("Bad Request. Missing credentials!");
        }

        //search user in DB by email
        const userDB = await User.findOne({ email });

        //if the user does not found in DB, it throw error!
        if (!userDB) {
          throw new Error("User not found");
        }

        /*compares the text of the password sent 
        through our client with the hashed password saved in the user record.*/
        const isValid = comparePassword(password, userDB.password);

        //if the password is correct
        if (isValid) {
          console.log("Authenticated Successfully!");
          done(null, userDB);
        }
        //if the password is incorrect
        else {
          console.log("Invalid Authentication.");
          done(null, null);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);
