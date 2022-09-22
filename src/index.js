const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./strategies/local");

//Routes
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const authRoute = require("./routes/auth");

require("./database");

const app = express();
const PORT = 3001;
//set memory store
const memoryStore = new session.MemoryStore();

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
    //add the memory store like a session store's value
    store: memoryStore,
  })
);

//to show in console what happened
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

//to show in console the memory store
app.use((req, res, next) => {
  console.log(memoryStore);
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
