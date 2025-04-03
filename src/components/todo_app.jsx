import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import "../assets/styles/TodoApplication.css";

function TodoApplication() {
  // STATE MANAGEMENT
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState(() => {
    const cachedData = localStorage.getItem("todoItem");
    return cachedData ? JSON.parse(cachedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoItem", JSON.stringify(todos));
  }, [todos]);

  // FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim().length > 3) {
      let isHadTodoText = todos.some(
        (findTodo) => findTodo.todoValue == todoText
      );
      if (!isHadTodoText) {
        setTodos((prevTodos) => [
          ...prevTodos,
          {
            todoId: crypto.randomUUID(),
            todoValue: todoText,
            completed: false,
          },
        ]);
        setTodoText("");
      } else {
        alert("this todo already created");
        setTodoText("");
      }
    } else {
      alert("minimum 4 characters required");
    }
  };

  // TOGGLE CHECK
  const handleCheck = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todoId === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // DELETE TODO
  const handleDelete = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.todoId !== todoId));
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <input
            type="text"
            name="todoinput"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter the todo"
          />
          <button type="submit">Add</button>
        </div>
      </form>
      <div className="todos_container">
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="todoList">
              <CheckIcon
                role="button"
                aria-label="check button"
                onClick={() => handleCheck(todo.todoId)}
                style={{ color: todo.completed ? "green" : "gray" }}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.todoValue}
              </span>
              <DeleteIcon
                role="button"
                aria-label="delete button"
                onClick={() => handleDelete(todo.todoId)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApplication;
