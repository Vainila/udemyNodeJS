const jwt = require("jsonwebtoken");

const User = require("../models/User");

const maxAge = 24 * 60 * 60;
const createJWT = (id) => {
   return jwt.sign({ id }, "chatroom secret", { expiresIn: maxAge });
};

const alertError = (error) => {
   let errors = { name: "", email: "", password: "" };

   if (error.message == "incorrect email") {
      errors.email = "This email not found";
   }
   if (error.message == "incorrect password") {
      errors.email = "The password is incorrect";
   }

   if (error.message.includes("user validation failed")) {
      Object.values(error.errors).forEach(({ properties }) => {
         errors[properties.path] = properties.message;
      });
   }
   if (error.code === 11000) {
      errors.email = "This email already registered";
   }
   return errors;
};

module.exports.signup = async (req, res) => {
   console.log(req.body);
   const { name, email, password } = req?.body;
   try {
      const user = await User.create({ name, email, password });
      const token = createJWT(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(201).json({ user });
   } catch (error) {
      let errors = alertError(error);
      return res.status(400).json({ errors });
   }
   res.send("signup");
};

module.exports.login = async (req, res) => {
   const { email, password } = req?.body;
   try {
      const user = await User.login(email, password);
      const token = createJWT(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      return res.status(201).json({ user });
   } catch (error) {
      let errors = alertError(error);
      return res.status(400).json({ errors });
   }

   res.send("login");
};

module.exports.logout = (req, res) => {
   res.send("logout");
};
