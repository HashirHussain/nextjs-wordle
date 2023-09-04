const ALPHABETS = "abcdefghijklmnopqrstuvwxyz";
const keyboardEvent = "keyup";
const enterKey = "enter";
const backspaceKey = "backspace";

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
  if (_key === enterKey) {
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
  if (ALPHABETS.indexOf(key) !== -1) {
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

export {
  ALPHABETS,
  backspaceKey,
  enterKey,
  keyboardEvent,
  getChosenAnswer,
  getChances,
  getLettersBlock,
  hasEnterTriggered,
  handleBackspace,
  fillBlock,
  unique,
};
export type { blocksValueType };
