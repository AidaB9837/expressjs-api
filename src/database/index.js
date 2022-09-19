const mongoose = require("mongoose");

//set Mongoose to connect node.js project to MongoDB(a NoSQL DB)
mongoose
  .connect("mongodb://localhost:27017/expressjs_tutorial")
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));
