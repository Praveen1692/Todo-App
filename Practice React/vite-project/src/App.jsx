import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editableTodoText, setEditableTodoText] = useState("");

  const data = async () => {
    const response = await fetch(`https://dummyjson.com/todos`);
    const result = await response.json();
    setTodo(result.todos);
  };
  useEffect(() => {
    data();
  }, []);
  const handleAddTodo = () => {
    const newTodo = {
      id: todo.length + 1,
      todo: input,
    };
    setTodo([newTodo, ...todo]);
    console.log("Todo Add");
    setInput("");
  };
  

  const handleTodoChange = (e) => {
    setEditableTodoText(e.target.value);
  };

  const handleTodoBlur = () => {
    setTodo(
      todo.map((todo) =>
        todo.id === editableTodoId ? { ...todo, todo: editableTodoText } : todo
      )
    );
    setEditableTodoId(null);
  };

  const handleTodoKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTodoBlur();
    }
  };
  const handleTodoClick = (id) => {
    setEditableTodoId(id);
    const todos = todo.find((todo) => todo.id === id);
    setEditableTodoText(todos.todo);
  };

  return (
    <>
      <h1>Start change Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Todo .."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add New Todo</button>
      </div>

      <div>
        <ul>
          {todo.map((ele) => (
            <li
              id="li"
              style={{ cursor: "pointer" }}
              key={ele.id}
              onClick={()=>handleTodoClick(ele.id)}
            >
              {editableTodoId === ele.id ? (
                <input
                  type="text"
                  value={editableTodoText}
                  onChange={(e)=>setEditableTodoText(e.target.value)}
                  onBlur={handleTodoBlur}
                  onKeyPress={handleTodoKeyPress}
                  autoFocus
                />
              ) : (
                ele.todo
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
