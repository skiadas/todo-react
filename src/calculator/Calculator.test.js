import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Calculator from "./Calculator.js";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Calculator component", () => {
  test("has class calculator", () => {
    act(() => {
      render(<Calculator />, container);
    });
    expect(container.querySelector(".calculator")).not.toEqual(null);
  });
  test("starts with 0 current value and no history", () => {
    act(() => {
      render(<Calculator />, container);
    });
    expect(container.querySelector(".primary").textContent).toEqual("0");
    expect(container.querySelector(".secondary").textContent).toEqual("");
  });
  test("adds numbers to current value when clicked", () => {
    act(() => {
      render(<Calculator />, container);
    });
    act(() => {
      findButton("5").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector(".primary").textContent).toEqual("5");
    act(() => {
      findButton("2").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector(".primary").textContent).toEqual("52");
  });
});

function findButton(label) {
  for (const el of container.querySelectorAll(".buttons button")) {
    if (el.textContent === label) return el;
  }
  return null;
}
