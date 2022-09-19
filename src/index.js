const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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
  })
);

//to show in console what happened
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

//basic routes
app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/markets", marketsRoute);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));