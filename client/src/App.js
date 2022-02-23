import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import React, { useState } from "react";

import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";

import "./App.css";

function App() {
   const [user, setUser] = useState(null);
   return (
      <BrowserRouter>
         <UserContext.Provider value={{ user, setUser }}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/chat" element={<Chat />} />
            </Routes>
         </UserContext.Provider>
      </BrowserRouter>
   );
}

export default App;
