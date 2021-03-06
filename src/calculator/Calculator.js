import React from "react";
import { useState, useEffect } from "react";
import "./Calculator.css";
import { handleNextValue } from "./CalcInternals.js";

const BUTTON_LABELS = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "=",
  "+",
];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      history: [],
      lastKey: null,
    };
  }

  handleClick(key) {
    this.setState((state) => handleNextValue(state, key));
  }

  render() {
    return (
      <div className="calculator">
        <Screen
          secondary={this.state.history.join("")}
          primary={this.state.currentValue}
        />
        <Buttons clicked={(value) => this.handleClick(value)} />
      </div>
    );
  }
}

function Screen(props) {
  const [theme, setTheme] = useState("light");
  return (
    <div className={"calc-screen theme-" + theme}>
      <Flash delay="5000">
        <b>Hello there!</b>
        <i>How are you?</i>
      </Flash>
      <div className="theme switches">
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("light")}>Light</button>
      </div>
      <span className="secondary">{props.secondary}</span>
      <span className="primary">{props.primary}</span>
    </div>
  );
}

function Buttons(props) {
  return (
    <div className="buttons">
      {BUTTON_LABELS.map((label) => (
        <Button text={label} key={label} called={() => props.clicked(label)} />
      ))}
    </div>
  );
}

function Button(props) {
  return <button onClick={() => props.called()}>{props.text}</button>;
}

function Flash(props) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (visible) {
      setTimeout(() => setVisible(false), props.delay || 2000);
    }
  });
  if (visible) {
    return <div>{props.children}</div>;
  } else {
    return "";
  }
}

export default Calculator;
