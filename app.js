const express = require("express");
const app = express();

app.listen(3000);

app.get("/", (req, res) => {
   res.send("Homepage");
});
app.get("/add-item", (req, res) => {
   res.send("<h1> Add items</h1>");
});
