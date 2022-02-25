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

userSchema.static.login = async function (email, password) {
   const user = await this.findOne({ email });
   if (user) {
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (isAuthenticated) {
         return user;
      } else {
         throw Error("Incorrect password");
      }
   } else {
      throw Error("Incorrect email");
   }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
