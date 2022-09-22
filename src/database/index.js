const mongoose = require("mongoose");
require("dotenv/config");

//set Mongoose to connect node.js project to MongoDB(a NoSQL DB)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));
