import { useSelector } from "react-redux";
import { findIndices, generateBlankArray, intersection } from "../lib";
import * as selector from "../redux/selectors";

const baseBlockStyle = `h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase`;
const emptyBlockStyle = `${baseBlockStyle} bg-gray-100 dark:bg-gray-900 dark:text-gray-50`;
const rightPositionStyle = `animate-[ping_75ms] bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50`;
const wrongPositionStyle = `bg-amber-400 border-amber-400 dark:bg-amber-400 dark:border-amber-400 text-gray-50`;
const noPositionStyle = `bg-gray-500 border-gray-500 dark:bg-gray-500 dark:border-gray-500 text-gray-50`;

export default function PlayBoard() {
  const letterLimit = useSelector(selector.letterLimit);
  const chanceLimit = useSelector(selector.chanceLimit);
  const tempWord = useSelector(selector.tempWord);
  const currentRow = useSelector(selector.currentSelectedRow);
  const correctWord = useSelector(selector.correctWord);
  const grid = useSelector(selector.grid);

  return (
    <div className="blocks-wrapper flex flex-col items-center gap-y-1">
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
                      correctWord
                    )}
                  >
                    {grid[rowIndex][blockIndex]}
                  </div>
                ) : (
                  <div
                    key={`block-${rowIndex}-${blockIndex}`}
                    className={emptyBlockStyle}
                  >
                    {""}
                  </div>
                );
              } else if (tempWord[blockIndex] && rowIndex === currentRow) {
                return (
                  <div
                    key={`block-${rowIndex}-${blockIndex}`}
                    className={emptyBlockStyle}
                  >
                    {tempWord[blockIndex]}
                  </div>
                );
              } else {
                return (
                  <div
                    key={`block-${rowIndex}-${blockIndex}`}
                    className={emptyBlockStyle}
                  >
                    {""}
                  </div>
                );
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
  correctWord: string
) => {
  if (correctWord[keyPosition] === letter) {
    return `${baseBlockStyle} ${rightPositionStyle}`; // at correct position - Green Color
  }

  if (correctWord.indexOf(letter) === -1) {
    return `${baseBlockStyle} ${noPositionStyle}`; // not present at all - Dark Color
  }

  if (correctWord.indexOf(letter) !== -1) {
    const indicesInCorrectWord = findIndices(correctWord.split(""), letter);
    const indicesInWholeWord = findIndices(wholeWord, letter);
    const commonIndices = intersection(
      indicesInCorrectWord,
      indicesInWholeWord
    );

    if (
      indicesInWholeWord.length > commonIndices.length &&
      indicesInCorrectWord.length === indicesInWholeWord.length
    ) {
      return `${baseBlockStyle} ${wrongPositionStyle}`; // present, but at wrong position (more than one appearance) - Yellow color
    }
    const occurrencesInCorrectWord = correctWord.split(letter).length - 1
    const indicesToCheck = indicesInWholeWord.slice(0, occurrencesInCorrectWord)

    if (commonIndices.length === 0 && indicesToCheck.includes(keyPosition)) {
      return `${baseBlockStyle} ${wrongPositionStyle}`; // present, but at wrong position - Yellow color
    }

    return `${baseBlockStyle} ${noPositionStyle}`; // not present at all - Dark Color
  }

  return emptyBlockStyle; // empty block style
};
