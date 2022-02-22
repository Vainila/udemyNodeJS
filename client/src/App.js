import React, { useEffect } from "react";
import { useState } from "react";
import Preloader from "./components/Preloader.component";
import { createTodo, readTodos, updateTodo } from "./functions";

function App() {
   const [todo, setTodo] = useState({
      title: "",
      content: "",
   });

   const [todos, setTodos] = useState(null);
   const [currentId, setCurrentId] = useState(0);

   useEffect(() => {
      const fetchData = async () => {
         const result = await readTodos();
         setTodos(result);
      };
      fetchData();
   }, []);

   useEffect(() => {
      let currentTodo =
         currentId != 0
            ? todos.find((todo) => todo._id === currentId)
            : { title: "", content: "" };
      setTodo(currentTodo);
   }, [currentId]);

   const clear = () => {
      setCurrentId(0);
      setTodo({ title: "", content: "" });
   };

   useEffect(() => {
      const clearField = (e) => {
         if (e.keyCode === 27) {
            clear();
         }
      };
      window.addEventListener("keydown", clearField);
      return () => window.removeEventListener("keydown", clearField);
   }, []);

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      if (currentId === 0) {
         const result = await createTodo(todo);
         setTodos([...todos, result]);
         clear();
      } else {
         await updateTodo(currentId, todo);
         clear();
      }
   };

   return (
      <div className="container">
         <div className="row">
            <form className="col s12" onSubmit={onSubmitHandler}>
               <div className="row">
                  <pre>{JSON.stringify(todo)}</pre>
                  <div className="input-field col s6">
                     <i className="material-icons prefix">title</i>
                     <input
                        value={todo.title}
                        id="icon_prefix"
                        type="text"
                        className="validate"
                        onChange={(e) => {
                           setTodo({ ...todo, title: e.target.value });
                        }}
                     />
                     <label htmlFor="icon_prefix">Title</label>
                  </div>
                  <div className="input-field col s6">
                     <i className="material-icons prefix">description</i>
                     <input
                        value={todo.content}
                        id="description"
                        type="text"
                        className="validate"
                        onChange={(e) =>
                           setTodo({ ...todo, content: e.target.value })
                        }
                     />
                     <label htmlFor="description">Content</label>
                  </div>
               </div>
               <div className="row right-align">
                  <button className="waves-effect waves-light btn">
                     Submit
                  </button>
               </div>
            </form>
         </div>
         {!todos ? (
            <Preloader />
         ) : todos.length > 0 ? (
            <ul className="collection">
               {todos.map((todo) => (
                  <li
                     onClick={() => setCurrentId(todo._id)}
                     href="#!"
                     className="collection-item valign-wrapper "
                     key={todo._id}
                  >
                     <div className="container">
                        <h4>{todo.title}</h4>
                        <p>{todo.content}</p>
                     </div>
                     <a href="#!" className="secondary-content">
                        <i className="material-icons">delete</i>
                     </a>
                  </li>
               ))}
            </ul>
         ) : (
            <div>Nothing to do</div>
         )}
      </div>
   );
}

export default App;
