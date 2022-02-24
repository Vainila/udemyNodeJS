const Room = require("./models/Room");
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = {
   origin: "http://localhost:3000",
   credentials: true,
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authRoutes);
app.use(cookieParser());
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const socketio = require("socket.io");

const io = socketio(http);
const { addUser, getUser, removeUser } = require("./helper");
const Message = require("./models/Message");
const PORT = process.env.PORT || 5000;

const mongodb =
   "mongodb+srv://v:vainila@cluster0.h2anz.mongodb.net/mernChat?retryWrites=true&w=majority";
mongoose
   .connect(mongodb)
   .then(() => {
      console.log("connected");
   })
   .catch((error) => {
      console.log(error);
   });

app.get("/set-cookies", (req, res) => {
   res.cookie("username", "Tony");
   res.cookie("isAuthenticated", true, { maxAge: 24 * 60 * 60 * 1000 });
   res.send("cookies are set ");
});

app.get("/get-cookies", (req, res) => {
   const cookies = req.cookies;
   console.log(cookies);
   res.json(cookies);
});

io.on("connection", (socket) => {
   Room.find().then((result) => {
      socket.emit("output-rooms", result);
      console.log("output-rooms", result);
   });
   socket.on("create-room", (name) => {
      const room = new Room({ name });
      room.save().then((result) => {
         io.emit("room-created", result);
      });
   });
   socket.on("join", ({ name, room_id, user_id }) => {
      const { error, user } = addUser({
         socket_id: socket.id,
         name,
         room_id,
         user_id,
      });
      socket.join(room_id);
      if (error) {
         console.log("join error", error);
      } else {
         console.log("join user", user);
      }
   });
   socket.on("sendMessage", (message, room_id, callback) => {
      const user = getUser(socket.id);
      const msgToStore = {
         name: user.name,
         user_id: user.user_id,
         room_id,
         text: message,
      };
      console.log("message, ", msgToStore);
      const msg = new Message(msgToStore);
      msg.save().then((result) => {
         io.to(room_id).emit("message", result);
         callback();
      });
      io.to(room_id).emit("message", msgToStore);
      callback();
   });
   socket.on("disconnect", () => {
      const user = removeUser(socket.id);
   });
});

http.listen(PORT, () => {
   console.log(`listening on port ${PORT}`);
});
