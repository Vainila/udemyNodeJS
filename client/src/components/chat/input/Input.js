import React from "react";

import "./Input.css";

const Input = ({ message, sendMessage, setMessage }) => {
   return (
      <form className="form" onSubmit={sendMessage}>
         <input
            placeholder="Type a message"
            className="input"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(event) =>
               event.key === "Enter" ? sendMessage(event) : null
            }
         />
         <button type="submit" className="btn sendButton ">
            Send message
         </button>
      </form>
   );
};

export default Input;
