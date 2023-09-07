import {
  blocksValueType,
  findIndices,
  getChances,
  getLettersBlock,
} from "../lib";

const blockBlockStyle = `h-12 w-12 sm:w-14 sm:h-14 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase`;
const rightPositionStyle = `animate-[ping_75ms] bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50`;
const wrongPositionStyle = `bg-amber-400 border-amber-400 dark:bg-amber-400 dark:border-amber-400 text-gray-50`;
const noPositionStyle = `bg-gray-500 border-gray-500 dark:bg-gray-500 dark:border-gray-500 text-gray-50`;

type PropsType = {
  chanceLimit: number;
  lettersLimit: number;
  blocksValue: blocksValueType;
  correctAnswer: string;
  submittedWords: blocksValueType;
};

const getBlockStyle = (
  submittedWord: any,
  correctAnswer: string,
  blockIndex: number,
  letter: string
) => {
  if (submittedWord) {
    if (correctAnswer[blockIndex] === letter) {
      return `${blockBlockStyle} ${rightPositionStyle}`;
    } else if (correctAnswer.indexOf(letter) !== -1) {
      let letterPresent = false;
      const letterAppearance = findIndices(correctAnswer.split(""), letter);
      for (let index = 0; index < letterAppearance.length; index++) {
        if (
          correctAnswer[letterAppearance[index]] !==
          submittedWord[letterAppearance[index]]
        ) {
          letterPresent = true;
        } else {
          letterPresent = false;
        }
      }
      if (letterPresent) {
        return `${blockBlockStyle} ${wrongPositionStyle}`;
      }
    } else if (correctAnswer.indexOf(letter) === -1) {
      return `${blockBlockStyle} ${noPositionStyle}`;
    }
  }

  return `${blockBlockStyle} border-gray-200 text-gray-600 dark:text-gray-50`;
};

export default function PlayBoard({
  chanceLimit,
  lettersLimit,
  blocksValue,
  correctAnswer,
  submittedWords,
}: PropsType) {
  return (
    <div className="blocks-wrapper flex flex-col gap-y-1 my-2">
      {getChances(chanceLimit).map((_, rowIndex: number) => {
        return (
          <div key={`row-${rowIndex}`} className="flex gap-x-1">
            {getLettersBlock(lettersLimit).map((_, blockIndex: number) => {
              return (
                <div
                  key={`block-${rowIndex}-${blockIndex}`}
                  className={getBlockStyle(
                    submittedWords[rowIndex],
                    correctAnswer,
                    blockIndex,
                    blocksValue[rowIndex][blockIndex]
                  )}
                >
                  {blocksValue[rowIndex][blockIndex]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
