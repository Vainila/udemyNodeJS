import React, { useState } from "react";

const Signup = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [nameError, setNameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");

   const submitHandler = async (e) => {
      e.preventDefault();
      console.log(name, email, password);
      try {
         const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
         });
         const data = await res.json();
         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="row">
         <div className="container" style={{ marginTop: "50px" }}>
            <form className="col s12" onSubmit={submitHandler}>
               <div className="row">
                  <div className="input-field col s12">
                     <input
                        id="name"
                        type="text"
                        className="validate"
                        value={name}
                        onChange={(e) => {
                           setName(e.target.value);
                        }}
                     />
                     <div className="name error red-text">Name is required</div>
                     <label htmlFor="first_name">First Name</label>
                  </div>
               </div>
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
                        password is required
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
                     <div className="email error red-text">
                        Email is required
                     </div>
                     <label htmlFor="email">Email</label>
                  </div>
               </div>
               <button type="submit" className="btn">
                  Signup
               </button>
            </form>
         </div>
      </div>
   );
};

export default Signup;
