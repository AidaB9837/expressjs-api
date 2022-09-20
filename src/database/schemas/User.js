const mongoose = require("mongoose");

//create new Schema for our DB in MongoDB
const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

//compile our schema in real model
module.exports = mongoose.model("users", UserSchema);
