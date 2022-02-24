import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
                     <li>
                        <Link to="/signup">Signup</Link>
                     </li>
                     <li>
                        <a href="collapsible.html">Logout</a>
                     </li>
                  </ul>
               </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
               <li>
                  <a href="sass.html">Login</a>
               </li>
               <li>
                  <a href="badges.html">Signup</a>
               </li>
               <li>
                  <a href="collapsible.html">Logout</a>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Navbar;
