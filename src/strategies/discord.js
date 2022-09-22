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

passport.use(
  new Strategy(
    //option's strategy
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ["identify"],
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken: accessToken, refreshToken: refreshToken });
      console.log({ infoUser: profile });

      //implement logic similar to local:
      try {
        //search user in DB by profile ID
        const discordUser = await DiscordUser.findOne({
          discordId: profile.id,
        });

        //if user already exist in DB
        if (discordUser) {
          console.log(`Found User: ${discordUser}`);
          return done(null, discordUser);
        }
        //if user does not exist in DB, create new user
        else {
          const newUser = await DiscordUser.create({
            discordId: profile.id,
          });
          console.log(`Create User: ${newUser}`);
          return done(null, newUser);
        }
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    }
  )
);
