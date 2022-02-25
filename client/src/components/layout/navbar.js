import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Navbar = () => {
   const { user, setUser } = useContext(UserContext);
   const logout = () => {
      try {
         fetch("https://localhost:5000/logout", {
            credentials: "include",
         });
         setUser(null);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <div>
            <nav>
               <div className="nav-wrapper">
                  <Link to="/" className="brand-logo">
                     Logo
                  </Link>
                  <a
                     href="#"
                     data-target="mobile-demo"
                     className="sidenav-trigger"
                  >
                     <i className="material-icons">menu</i>
                  </a>
                  <ul className="right hide-on-med-and-down">
                     <li>
                        <Link to="/login">Login</Link>
                     </li>
                     {!user ? (
                        <li>
                           <Link to="/signup">Signup</Link>
                        </li>
                     ) : (
                        <li>
                           <button className="btn" onClick={logout}>
                              Logout
                           </button>
                        </li>
                     )}
                  </ul>
               </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
               <li>
                  <a href="sass.html">Login</a>
               </li>
               {!user ? (
                  <li>
                     <Link to="/signup">Signup</Link>
                  </li>
               ) : (
                  <li>
                     <button className="btn" onClick={logout}>
                        Logout
                     </button>
                  </li>
               )}
               <li>
                  <a href="collapsible.html">Logout</a>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Navbar;
