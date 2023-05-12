import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [showArchive, setShowArchive] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        active: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
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
    
  }    
  const handleShowArchive = () => {
    setShowArchive(!showArchive);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Todo App</h1>
      <div className="d-flex">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Enter a todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ul className="list-group mt-4">
        {todos.map((todo) => (
          <li
            className={`list-group-item d-flex justify-content-between ${
              todo.active ? 'active' : ''
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
            <button className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="footer mt-4">
        <button className="btn btn-secondary" onClick={handleShowArchive}>
          {showArchive ? 'Hide Archive' : 'Show Archive'}
        </button>
        {showArchive && (
          <div className="archive">
            <h2>Archive</h2>
            <ul className="list-group mt-4">
              {deletedTodos.map((todo) => (
                <li className="list-group-item" key={todo.id}>
                  {todo.text}
                </li>
              ))
            }
            </ul>
            <button className="btn btn-secondary" onClick={handleDeleteArchive}>Delete archive</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
