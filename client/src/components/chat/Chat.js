import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import io from "socket.io-client";

let socket;

const Chat = () => {
   let { room_id, room_name } = useParams();
   const { user, setUser } = useContext(UserContext);
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);

   const ENDPT = "localhost:5000";
   useEffect(() => {
      socket = io(ENDPT);
      socket.emit("join", { name: user.name, room_id, user_id: user.id });
   }, []);
   useEffect(() => {
      socket.on("message", (message) => {
         setMessages([...messages, message]);
      });
   }, [messages]);

   const sendMessage = (event) => {
      event.preventDefault();
      if (message) {
         console.log(message);
         socket.emit("sendMessage", message, room_id, () => setMessage(""));
      }
   };

   return (
      <div>
         {room_id}
         {room_name}

         <pre>{JSON.stringify(messages, null, 2)}</pre>

         <div>Chat {JSON.stringify(user)}</div>
         <form onSubmit={sendMessage}>
            <input
               type="text"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               onKeyPress={(event) =>
                  event.key === "Enter" ? sendMessage(event) : null
               }
            />
            <button type="submit" className="btn">
               Send message
            </button>
         </form>
      </div>
   );
};

export default Chat;
