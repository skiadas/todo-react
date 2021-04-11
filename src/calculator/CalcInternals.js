const OPERATIONS = ["/", "+", "*", "-"];

const isOp = (key) => OPERATIONS.includes(key);
const isEq = (key) => key === "=";
const isNumber = (key) => !(isOp(key) || isEq(key));

// Cases
// newKey        last history    lastKey     do
// +/-*          none                        move current to history, add operation, reset current
// +/-*          =                           move current to history, add operation, reset current
// +/-*          +/-*            number      add current+operation to history, reset current
// +/-*          +/-*            operation   replace op in history
// number                        null        "start" current
// number                        number      expand current
// number                        operation   "start" current
// number                        =           clear history, start current
// =                             none
// =                             number/op   do the math, put in current, move to history
// =                             =           replace last num in history, do the math put in current

export function handleNextValue(state, key) {
  return withLastKey(key, reallyHandleNextValue(state, key));
}

function reallyHandleNextValue(state, key) {
  const { currentValue, history, lastKey } = state;
  if (isNumber(key)) {
    if (isEq(lastKey)) return reset();
    return applyToCurrent(state, (v) => (v || 0) * 10 + parseInt(key));
  }
  if (isOp(key)) {
    if (isOp(lastKey)) {
      return applyToHistory(state, (h) => [...h.slice(0, h.length - 1), key]);
    }
    if (isEq(lastKey)) {
      return {
        currentValue: 0,
        history: [currentValue, key],
      };
    }
    return {
      currentValue: 0,
      history: [...history, currentValue, key],
    };
  }
  if (isEq(key)) {
    if (isEq(lastKey)) {
      const newHistory = replace(history, history.length - 2, currentValue);
      return { currentValue: computeResult(newHistory), history: newHistory };
    }
    const newHistory = [...history, currentValue, key];
    return { currentValue: computeResult(newHistory), history: newHistory };
  }
  console.log("Warning: you are not handling some case");
  return state;
}

function withLastKey(lastKey, { currentValue, history }) {
  return { currentValue, history, lastKey };
}

function reset() {
  return { currentValue: 0, history: [] };
}

function applyToCurrent({ currentValue, ...rest }, f) {
  return { currentValue: f(currentValue), ...rest };
}

function applyToHistory({ history, ...rest }, f) {
  return { history: f(history), ...rest };
}

function computeResult(h) {
  return eval(h.slice(0, h.length - 1).join(""));
}

function replace(arr, i, v) {
  const newArr = [...arr];
  newArr[i] = v;
  return newArr;
}
