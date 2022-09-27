const passport = require("passport");
const { Strategy } = require("passport-discord");
const DiscordUser = require("../database/schemas/DiscordUser");
require("dotenv/config");

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
    const user = await DiscordUser.findById(id);
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

async function discordVerifyFunction(accessToken, refreshToken, profile, done) {
  //this is the discord profile ID that is retrieved via OAuth
  const { id: discordId } = profile;

  //implement logic similar to local:
  try {
    //search user in DB by profile ID
    const discordUser = await DiscordUser.findOne({ discordId });

    //if user already exist in DB
    if (discordUser) {
      return done(null, discordUser);
    }
    //if user does not exist in DB, create new user
    else {
      const newUser = await DiscordUser.create({ discordId });
      return done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    return done(error, null);
  }
}

passport.use(
  new Strategy(
    //option's strategy
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ["identify"],
    },
    discordVerifyFunction
  )
);

module.exports = { discordVerifyFunction };
