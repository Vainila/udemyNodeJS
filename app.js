const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const Item = require("./models/items");
const app = express();

const mongodb =
   "mongodb+srv://v:vainila@cluster0.h2anz.mongodb.net/item-database?retryWrites=true&w=majority";
mongoose
   .connect(mongodb, { useNewUrlParser: true })
   .then(() => {
      console.log("connected");
      app.listen(3000);
   })
   .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
   res.redirect("/get-items");
});

app.get("/get-items", (req, res) => {
   Item.find()
      .then((result) => {
         res.render("index", { items: result });
      })
      .catch((err) => console.log(err));
});

app.get("/add-item", (req, res) => {
   res.render("add-item");
});

app.use((req, res) => {
   res.render("404");
});
