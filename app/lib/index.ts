const ALPHABETS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
const KEYBOARD_EVENT = "keyup";
const ENTER_KEY = "enter";
const BACKSPACE_KEY = "backspace";

type blocksValueType = Array<Array<string>>;

const getChosenAnswer = (list: Array<string>) => {
  return list[Math.floor(Math.random() * list.length)];
};

const getChances = (count: number) => {
  return Array(count).fill("");
};

const getLettersBlock = (count: number) => {
  return Array(count).fill("");
};

const hasEnterTriggered = (
  _key: string,
  blocksValue: blocksValueType,
  selectedRow: number,
  lettersLimit: number,
  chanceLimit: number
) => {
  if (_key === ENTER_KEY) {
    if (selectedRow < chanceLimit) {
      if (blocksValue[selectedRow].length >= lettersLimit) {
        return true;
      }
    }
  }
  return false;
};

const handleBackspace = (values: blocksValueType, selectedRow: number) => {
  const currentValue = values[selectedRow];
  currentValue.pop();
  values[selectedRow] = [...currentValue];
  return values;
};

const fillBlock = (
  key: string,
  values: blocksValueType,
  selectedRow: number,
  lettersLimit: number
) => {
  if (values.length === selectedRow) {
    return values;
  }
  if (values[selectedRow].length === lettersLimit) {
    return values;
  }
  if (ALPHABETS.flat().indexOf(key) !== -1) {
    const row = [...values[selectedRow]];
    row.push(key);
    const newValue = values;
    newValue[selectedRow] = [...row];
    return newValue;
  }
  return values;
};

const unique = (arr: any) => {
  return arr.filter(function (item: any, pos: number) {
    return arr.indexOf(item) == pos;
  });
};

const findIndices = (arr: any, value: any) => {
  return arr.map((e: any, i: number) => (e === value ? i : "")).filter(String);
};

export {
  ALPHABETS,
  BACKSPACE_KEY,
  ENTER_KEY,
  fillBlock,
  findIndices,
  getChances,
  getChosenAnswer,
  getLettersBlock,
  handleBackspace,
  hasEnterTriggered,
  KEYBOARD_EVENT,
  unique,
};
export type { blocksValueType };
