const CHANCE_LIMIT = 6;
const ALPHABETS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
const KEYBOARD_EVENT = "keyup";
const ENTER_KEY = "enter";
const BACKSPACE_KEY = "backspace";
const DELETE_KEY = "delete";

type gridType = Array<Array<string>>;

const pickRandom = (list: Array<string>, limit: number) => {
  const _list = list.filter((item) => item.length === limit);
  return _list[Math.floor(Math.random() * _list.length)];
};

const generateBlankArray = (count: number) => {
  return Array(count).fill("");
};

const isEnterPressed = (_key: string) => {
  return _key.toLowerCase() === ENTER_KEY;
};

const isAlphabetPressed = (key: string) => {
  return ALPHABETS.flat().indexOf(key.toLowerCase()) !== -1;
};

const isDeletedPressed = (key: string) => {
  return (
    key.toLowerCase() === BACKSPACE_KEY || key.toLowerCase() === DELETE_KEY
  );
};

const findIndices = (arr: any, value: any) => {
  return arr.map((e: any, i: number) => (e === value ? i : "")).filter(String);
};

export {
  ALPHABETS,
  BACKSPACE_KEY,
  CHANCE_LIMIT,
  ENTER_KEY,
  KEYBOARD_EVENT,
  findIndices,
  generateBlankArray,
  isAlphabetPressed,
  isDeletedPressed,
  isEnterPressed,
  pickRandom,
};
export type { gridType };
