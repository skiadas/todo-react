import React from "react";
import "./Todos.css";

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["first", "second", "third"],
    };
  }
  removeTodo(i) {
    this.setState(({ items, ...rest }) => {
      return {
        items: items.filter((_, index) => index !== i),
        ...rest,
      };
    });
  }
  addItem(text) {
    if (text !== "") {
      this.setState(({ items, ...rest }) => ({
        items: [text, ...items],
        ...rest,
      }));
    }
  }
  render() {
    const items = this.state.items.map((item, i) => (
      <Todo title={item} key={item} handleDelete={() => this.removeTodo(i)} />
    ));
    return (
      <div>
        Do stuff {this.props.name}!<ul>{items}</ul>
        <TodoEdit handleNew={(item) => this.addItem(item)} />
        <Summary n={this.state.items.length} />
      </div>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isNew: true };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ isNew: false }), 0);
  }

  render() {
    return (
      <li
        className={this.state.isNew ? "new" : ""}
        onClick={() => this.props.handleDelete()}
      >
        {this.props.title}
      </li>
    );
  }
}

// function Todo(props) {
//   // settimeout to remove class when component on page
//   return (
//     <li className="new" onClick={() => props.handleDelete()}>
//       {props.title}
//     </li>
//   );
// }

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
