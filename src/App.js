import { useEffect, useState } from "react";
/**
 * @typedef {{text:string,done:boolean}}Todo
 */

function iniTodos() {
  /**
   * @type {Todo[]}
   */
  let todos = [];
  let todosString = localStorage.getItem("todos");
  if (todosString) {
    todos = JSON.parse(todosString);
  }
  return todos;
}

function App() {
  const [todos, setTodos] = useState(iniTodos);
  const [todo, setTodo] = useState("");
  function addTodo() {
    setTodos([...todos, { done: false, text: todo }]);
    setTodo("");
  }

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function updateTodo(idx) {
    return () => {
      setTodos(todos.map((t, i) => (i === idx ? { ...t, done: !t.done } : t)));
    };
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: 15,
        flexDirection: "column",
      }}
    >
      <div>
        <input
          type="text"
          placeholder="Nueva TODO..."
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <button onClick={addTodo}>Agregar</button>
      </div>
      <ol>
        {todos.map((t, i) => (
          <li key={i.toString()}>
            <input
              id={"todo" + i}
              type="checkbox"
              onChange={updateTodo(i)}
              checked={t.done}
            />{" "}
            <label
              htmlFor={"todo" + i}
              style={t.done ? { textDecorationLine: "line-through" } : {}}
            >
              {t.text}
            </label>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
