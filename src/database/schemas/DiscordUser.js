const mongoose = require("mongoose");

//create new Schema for our DB in MongoDB
const DiscordUserSchema = new mongoose.Schema({
  discordId: {
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
module.exports = mongoose.model("discord_users", DiscordUserSchema);
