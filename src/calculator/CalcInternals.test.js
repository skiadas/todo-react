import { handleNextValue } from "./CalcInternals.js";
describe("handleNextValue", () => {
  test("on number key with number last key extends the current", () => {
    expect(
      handleNextValue({ currentValue: 5, history: [2, "+"], lastKey: "5" }, "2")
    ).toEqual({ currentValue: 52, history: [2, "+"], lastKey: "2" });
  });
});
