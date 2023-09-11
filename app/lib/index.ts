const CHANCE_LIMIT = 6;
const DEFAULT_LETTER_LIMIT = 4;
const ALPHABETS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
const KEYBOARD_EVENT = "keyup";
const ENTER_KEY = "enter";
const BACKSPACE_KEY = "backspace";
const DELETE_KEY = "delete";

type blocksValueType = Array<Array<string>>;

const pickRandom = (list: Array<string>, limit: number) => {
  const _list = list.filter((item) => item.length === limit);
  return "muggy"
  return _list[Math.floor(Math.random() * _list.length)];
};

const getChances = (count: number) => {
  return Array(count).fill("");
};

const getLettersBlock = (count: number) => {
  return Array(count).fill("");
};

const isEnterPressed = (_key: string) => {
  return _key.toLowerCase() === ENTER_KEY;
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

const isAlphabetPressed = (key: string) => {
  return ALPHABETS.flat().indexOf(key.toLowerCase()) !== -1;
};

const isDeletedPressed = (key: string) => {
  return (
    key.toLowerCase() === BACKSPACE_KEY || key.toLowerCase() === DELETE_KEY
  );
};

export {
  ALPHABETS,
  BACKSPACE_KEY,
  ENTER_KEY,
  fillBlock,
  findIndices,
  getChances,
  pickRandom,
  getLettersBlock,
  handleBackspace,
  isEnterPressed,
  KEYBOARD_EVENT,
  unique,
  CHANCE_LIMIT,
  isAlphabetPressed,
  isDeletedPressed,
};
export type { blocksValueType };
