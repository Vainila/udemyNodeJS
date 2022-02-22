import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoDB =
   "mongodb+srv://v:vainila@cluster0.h2anz.mongodb.net/mernDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
   app.listen(PORT);
});

mongoose
   .connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
   .then(() => {
      console.log(`server is running on port ${PORT}`);
   })
   .catch((err) => console.log(err));
