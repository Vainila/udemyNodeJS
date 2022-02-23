const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const roomSchema = new Mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
});

const Room = mongoose.model("room", roomSchema);
module.exports = Room;
