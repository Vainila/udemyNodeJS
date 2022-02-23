import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Home = () => {
   const { user, setUser } = useContext(UserContext);
   const setAsJohn = () => {
      const john = {
         name: "John",
         email: "john@mail.com",
         password: "123",
         id: "123",
      };
      setUser(john);
   };
   const setAsTom = () => {
      const tom = {
         name: "Tom",
         email: "tom@mail.com",
         password: "124",
         id: "124",
      };
      setUser(tom);
   };
   return (
      <div>
         <div>Home {JSON.stringify(user)}</div>
         <button onClick={setAsJohn}>set as John</button>
         <button onClick={setAsTom}>set as Tom</button>
         <Link to="/chat">go to chat</Link>
      </div>
   );
};

export default Home;
