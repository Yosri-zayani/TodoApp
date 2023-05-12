import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoApp.css";
import backgroundImage from "./images/bg-desktop-dark.jpeg";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [showArchive, setShowArchive] = useState(false);
  const [hideArchive, SetHideArchive] = useState(true);
  const Cond = hideArchive || deletedTodos.length === 0;
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        active: false,
      };
      SetHideArchive(false);

      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const deletedTodo = todos.find((todo) => todo.id === id);
    setTodos(updatedTodos);
    setDeletedTodos([...deletedTodos, deletedTodo]);
  };

  const handleToggleActive = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          active: !todo.active,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteArchive = () => {
    setDeletedTodos([]);
  };
  const handleShowArchive = () => {
    setShowArchive(!showArchive);
  };

  return (
    <>
      <div className="overflow-auto page-container">
        <img className="image" src={backgroundImage} alt="background"></img>
        <center>
        <div className="container-sm "style={{marginTop:"12rem",maxHeight:'80%'}}>
          <h1 className="Title text-left">TODO </h1>
          <div className="container-md d-flex" >
            <input
              type="text"
              className="inputField form-control mr-2"
              placeholder="Enter task here "
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary" onClick={handleAddTodo}>
              Add Todo
            </button>
          </div>
          <div className="container  center mt-4">
            <ul className="list-group mt-4">
              {todos.map((todo) => (
                <li
                  className={`inputField list-group-item d-flex justify-content-between ${
                    todo.active ? "active" : ""
                  }`}
                  key={todo.id}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={todo.active}
                      onChange={() => handleToggleActive(todo.id)}
                      className="mr-2"
                    />
                    {todo.text}
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {Cond ? (
              ""
            ) : (
              <div className="footer mt-4">
                <button className="btn btn-info" onClick={handleShowArchive}>
                  {showArchive ? "Hide Archive" : "Show Archive"}
                </button>
                {showArchive && (
                  <div className="archive">
                    <h2 className="Title">Archive</h2>
                    <ul className="list-group mt-4">
                      {deletedTodos.map((todo) => (
                        <li
                          className="inputField list-group-item"
                          key={todo.id}
                        >
                          {todo.text}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="btn btn-primary"
                      onClick={handleDeleteArchive}
                    >
                      Delete archive
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        </center>
      </div>
    </>
  );
};

export default TodoApp;
