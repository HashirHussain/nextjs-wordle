import { useSelector } from "react-redux";
import {
  blocksValueType,
  generateBlankArray
} from "../lib";
import {
  chanceLimit as chanceLimitSelector,
  letterLimit as letterLimitSelector,
} from "../redux/selectors";

const baseBlockStyle = `h-12 w-12 sm:w-14 sm:h-14 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase`;
const rightPositionStyle = `animate-[ping_75ms] bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50`;
const wrongPositionStyle = `bg-amber-400 border-amber-400 dark:bg-amber-400 dark:border-amber-400 text-gray-50`;
const noPositionStyle = `bg-gray-500 border-gray-500 dark:bg-gray-500 dark:border-gray-500 text-gray-50`;

type PropsType = {
  grid: blocksValueType;
  currentRow: number;
  tempWord: Array<string>;
  correctAnswer: string;
};

export default function PlayBoard({
  grid,
  currentRow,
  tempWord,
  correctAnswer,
}: PropsType) {

  const letterLimit = useSelector(letterLimitSelector);
  const chanceLimit = useSelector(chanceLimitSelector);

  return (
    <div className="blocks-wrapper flex flex-col gap-y-1 my-2">
      {generateBlankArray(chanceLimit).map((_, rowIndex: number) => {
        return (
          <div key={`row-${rowIndex}`} className="flex gap-x-1">
            {generateBlankArray(letterLimit).map((_, blockIndex: number) => {
              if (Array.isArray(grid[rowIndex])) {
                return grid[rowIndex][blockIndex] ? (
                  <div
                    key={`block-${rowIndex}-${blockIndex}`}
                    className={getBlockStyle(
                      grid[rowIndex][blockIndex],
                      grid[rowIndex],
                      blockIndex,
                      correctAnswer
                    )}
                  >
                    {grid[rowIndex][blockIndex]}
                  </div>
                ) : (
                  generateEmptyBlock(`block-${rowIndex}-${blockIndex}`)
                );
              } else if (tempWord[blockIndex] && rowIndex === currentRow) {
                return (
                  <div
                    key={`block-${rowIndex}-${blockIndex}`}
                    className={`${baseBlockStyle} dark:text-gray-50`}
                  >
                    {tempWord[blockIndex]}
                  </div>
                );
              } else {
                return generateEmptyBlock(`block-${rowIndex}-${blockIndex}`);
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

const getBlockStyle = (
  letter: string,
  wholeWord: Array<string>,
  keyPosition: number,
  correctAnswer: PropsType["correctAnswer"]
) => {
  if (correctAnswer[keyPosition] === letter) {
    return `${baseBlockStyle} ${rightPositionStyle}`; // at correct position - Green Color
  }

  if (correctAnswer.indexOf(letter) === -1) {
    return `${baseBlockStyle} ${noPositionStyle}`; // not present at all - Dark Color
  }

  if (correctAnswer.indexOf(letter) !== -1) {
    //TODO - write robust logic to show yellow color
    return `${baseBlockStyle} ${wrongPositionStyle}`; // present, but at wrong position - Yellow color
  }

  return `${baseBlockStyle} dark:text-gray-50`; // empty block style
};

const generateEmptyBlock = (keyIndex: string) => {
  return (
    <div key={keyIndex} className={baseBlockStyle}>
      {""}
    </div>
  );
};
