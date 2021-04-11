import React from "react";
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
  return (
    <div className="calc-screen">
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

export default Calculator;
