import { FiArrowLeft, FiCornerDownLeft } from "react-icons/fi";
import { ALPHABETS, blocksValueType, findIndices } from "../lib";

const keyStyle = `flex grow shrink basis-px
items-center justify-center
px-3 py-1 sm:py-2
font-semibold text-gray-800
bg-gray-100 active:bg-gray-200
dark:text-gray-50 dark:bg-gray-700
border border-gray-200 hover:border-gray-300 active:border-gray-400
rounded-md
uppercase
cursor-pointer
select-none`;

const correctKeyStyle = `${keyStyle} bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50`;
const incorrectKey = `${keyStyle} bg-gray-400 dark:bg-gray-400 text-gray-50`;
const misplacedKeyStyle = `${keyStyle} bg-amber-400 border-amber-400 dark:bg-amber-400 dark:border-amber-400 text-gray-50`;

const getKeyStyle = (
  key: string,
  grid: blocksValueType,
  correctAnswer: string
) => {
  return keyStyle;
  //TODO - Green/ Yellow/ Dark color
  if (grid.flat().indexOf(key) === -1) {
    return keyStyle; //untouched key - default style
  }

  const KeyPositions = findIndices(correctAnswer.split(""), key);
  if (KeyPositions.length === 0) {
    return incorrectKey;
  }
};

export default function KeyBoard({
  onKeyboardClick,
  correctAnswer,
  grid,
}: {
  onKeyboardClick: (arg0: string) => void;
  correctAnswer: string;
  grid: blocksValueType;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="flex flex-row justify-stretch gap-x-1">
        {ALPHABETS[0].map((key: string, index: number) => {
          return (
            <button
              type="button"
              tabIndex={-1}
              key={`key - ${key} -${index} `}
              className={getKeyStyle(key, grid, correctAnswer)}
              onClick={() => onKeyboardClick(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="flex flex-row justify-stretch gap-x-1">
        {ALPHABETS[1].map((key: string, index: number) => {
          return (
            <button
              type="button"
              tabIndex={-1}
              key={`key - ${key} -${index} `}
              className={getKeyStyle(key, grid, correctAnswer)}
              onClick={() => onKeyboardClick(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="flex flex-row justify-stretch gap-x-1">
        <button
          type="button"
          tabIndex={-1}
          className={keyStyle}
          onClick={() => onKeyboardClick("Backspace")}
        >
          {"  "}
          <FiArrowLeft />
          {"  "}
        </button>
        {ALPHABETS[2].map((key: string, index: number) => {
          return (
            <button
              type="button"
              tabIndex={-1}
              key={`key - ${key} -${index} `}
              className={getKeyStyle(key, grid, correctAnswer)}
              onClick={() => onKeyboardClick(key)}
            >
              {key}
            </button>
          );
        })}
        <button
          type="button"
          tabIndex={-1}
          className={keyStyle}
          onClick={() => onKeyboardClick("Enter")}
        >
          {"  "}
          <FiCornerDownLeft />
          {"  "}
        </button>
      </div>
    </div>
  );
}
