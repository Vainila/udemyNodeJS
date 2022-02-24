const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { isEmail } = validator;

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please enter a name"],
   },
   email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "There's already an account with this email"],
      lowercase: true,
      validate: [isEmail, "Please enter a valid email address"],
   },
   password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters"],
   },
});
userSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
