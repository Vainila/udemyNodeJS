const User = require("../models/User");

const alertError = (error) => {
   let errors = { name: "", email: "", password: "" };
   console.log(error.code);
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
      return res.status(201).json({ user });
   } catch (error) {
      let errors = alertError(error);
      return res.status(400).json({ errors });
   }
   res.send("signup");
};

module.exports.login = (req, res) => {
   res.send("login");
};

module.exports.logout = (req, res) => {
   res.send("logout");
};
