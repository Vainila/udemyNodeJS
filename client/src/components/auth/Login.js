import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Login = () => {
   const { user, setUser } = useContext(UserContext);

   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [nameError, setNameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");

   const submitHandler = async (e) => {
      setEmailError("");
      setNameError("");
      setPasswordError("");
      e.preventDefault();
      console.log(name, email, password);
      try {
         const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
         });
         const data = await res.json();
         if (data.errors) {
            setNameError(data.errors.name);
            setPasswordError(data.errors.password);
         }

         if (data.user) {
            setUser(data.user);
         }
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      if (user) {
         navigate("/");
      }
   });
   return (
      <div className="row">
         <div className="container" style={{ marginTop: "50px" }}>
            <form className="col s12" onSubmit={submitHandler}>
               <div className="row">
                  <div className="input-field col s12">
                     <input
                        value={password}
                        onChange={(e) => {
                           setPassword(e.target.value);
                        }}
                        id="password"
                        type="password"
                        className="validate"
                     />
                     <div className="password error red-text">
                        {passwordError}
                     </div>
                     <label htmlFor="password">Password</label>
                  </div>
               </div>
               <div className="row">
                  <div className="input-field col s12">
                     <input
                        id="email"
                        type="email"
                        className="validate"
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                        }}
                     />
                     <div className="email error red-text">{emailError}</div>
                     <label htmlFor="email">Email</label>
                  </div>
               </div>
               <button type="submit" className="btn">
                  Login
               </button>
            </form>
         </div>
      </div>
   );
};

export default Login;
