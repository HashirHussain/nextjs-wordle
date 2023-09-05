import {
  blocksValueType,
  findIndices,
  getChances,
  getLettersBlock,
} from "../lib";

const blockStyle = `h-12 w-12 sm:w-14 sm:h-14 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md border-gray-200 uppercase`;
const rightPositionStyle = `animate-[ping_75ms] bg-lime-200 border-lime-200`;
const wrongPositionStyle = `bg-yellow-300 border-yellow-300`;
const noPositionStyle = `bg-gray-300 border-gray-300`;

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
      return `${blockStyle} ${rightPositionStyle}`;
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
        return `${blockStyle} ${wrongPositionStyle}`;
      }
    } else if (correctAnswer.indexOf(letter) === -1) {
      return `${blockStyle} ${noPositionStyle}`;
    }
  }

  return `${blockStyle}`;
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
