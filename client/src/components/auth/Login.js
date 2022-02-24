import React from "react";

const Login = () => {
   return (
      <div className="row">
         <div className="container" style={{ marginTop: "50px" }}>
            <form className="col s12">
               <div className="row">
                  <div className="input-field col s12">
                     <input id="first_name" type="text" className="validate" />
                     <label htmlFor="first_name">First Name</label>
                  </div>
               </div>
               <div className="row">
                  <div className="input-field col s12">
                     <input
                        id="password"
                        type="password"
                        className="validate"
                     />
                     <label htmlFor="password">Password</label>
                  </div>
               </div>
               <div className="row">
                  <div className="input-field col s12">
                     <input id="email" type="email" className="validate" />
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

export default Login;
