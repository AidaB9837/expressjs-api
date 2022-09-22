const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./strategies/local");

//Routes
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const authRoute = require("./routes/auth");

require("./database");

const app = express();
const PORT = 3001;

//accepted body request types
app.use(express.json());
app.use(express.urlencoded());

//set cookie-parser
app.use(cookieParser());
app.use(
  session({
    secret: "LIDSHCKUGDKYGCAASJCGYYSDKG",
    resave: false,
    saveUninitialized: false,
    //set connect-mongo to configure our session store with our MongoDB's collection
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/expressjs_tutorial",
    }) /*now, our data will be saved in our db, 
        so we could make requests to the server without having to log in again.
        Then, if the server crashes for some reason,
        all data in the DB session will be backed up*/,
  })
);

//to show in console what happened
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

//after the session has been initialize, we go to initialize passport and his session
app.use(passport.initialize());
app.use(passport.session());

//basic routes
app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/markets", marketsRoute);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));
