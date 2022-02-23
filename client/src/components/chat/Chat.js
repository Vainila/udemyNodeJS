import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Chat = () => {
   const { user, setUser } = useContext(UserContext);
   return (
      <div>
         <div>Chat {JSON.stringify(user)}</div>
         <Link to="/">go to home</Link>
      </div>
   );
};

export default Chat;
