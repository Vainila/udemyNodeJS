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

app.get("/create-item", (req, res) => {
   const item = new Item({
      name: "book",
      price: "30",
   });
   item
      .save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
});

app.get("/get-items", (req, res) => {
   Item.find()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
});
app.get("/get-itemById", (req, res) => {
   Item.findById("6213a5553d92678779861497")
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
   const items = [
      { name: "mobile phone", price: "300" },
      { name: "book", price: "30" },
      { name: "computer", price: "1500" },
   ];
   res.render("index", { items });
});
app.get("/add-item", (req, res) => {
   res.render("add-item");
});

app.use((req, res) => {
   res.render("404");
});
