import "./Todos.css";
import { useState, useEffect } from "react";

export default function Todos(props) {
  const [items, setItems] = useState(["first", "second", "third"]);
  function removeTodo(i) {
    setItems(items.filter((_, index) => index !== i));
  }
  function addItem(text) {
    if (text !== "") setItems([...items, text]);
  }
  return (
    <div>
      Do stuff {props.name}!
      <ul>
        {items.map((item, i) => (
          <Todo title={item} key={i} handleDelete={() => removeTodo(i)} />
        ))}
      </ul>
      <TodoEdit handleNew={addItem} />
      <Summary n={items.length} />
    </div>
  );
}

function Todo(props) {
  const [isNew, setNew] = useState(true);
  useEffect(() => {
    if (isNew) setNew(false);
  }, [isNew]);
  return (
    <li className={isNew ? "new" : ""} onClick={() => props.handleDelete()}>
      {props.title}
    </li>
  );
}

function TodoEdit(props) {
  return (
    <input
      type="input"
      onBlur={(ev) => {
        props.handleNew(ev.target.value);
        ev.target.value = "";
      }}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") ev.target.blur();
        if (ev.key === "Escape") ev.target.value = "";
      }}
    />
  );
}

function Summary(props) {
  return <div>You have {props.n > 0 ? props.n : "no"} tasks to do!</div>;
}
