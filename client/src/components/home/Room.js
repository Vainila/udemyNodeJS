import React from "react";

const Room = ({ name }) => {
   return (
      <div className="col s12 m6">
         <div className="card horizontal">
            <h2 className="header">{name}</h2>
            <div className="card-stacked">
               <div className="card-content">
                  <p>
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                     Illum non, mollitia minus qui possimus soluta?
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Room;
