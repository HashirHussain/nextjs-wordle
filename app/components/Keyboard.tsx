import { FiArrowLeft, FiCornerDownLeft } from "react-icons/fi";
import { ALPHABETS, blocksValueType, findIndices } from "../lib";

const keyStyle = `flex grow shrink basis-px
items-center justify-center
px-3 py-1 sm:py-2
font-semibold text-base 
bg-gray-100 active:bg-gray-200
border border-gray-200 hover:border-gray-300 active:border-gray-400
rounded-md
uppercase
cursor-pointer
select-none`;

const correctKeyStyle = `${keyStyle} bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-white`;
const incorrectKey = `${keyStyle} bg-gray-400 dark:bg-gray-400 text-white`;
const misplacedKeyStyle = `${keyStyle} bg-amber-500 border-amber-500 dark:bg-amber-500 dark:border-amber-500 text-white`;

const getKeyStyle = (
    key: string,
    grid: blocksValueType,
    correctAnswer: string
) => {
    if (grid.flat().indexOf(key) === -1) {
        return keyStyle; //untouched key - default style
    }

    if (correctAnswer.indexOf(key) === -1) {
        return incorrectKey;
    }

    const pos = findIndices(correctAnswer.split(""), key);
    const currPoss = grid.map((item) => findIndices(item, key)).flat();
    const onCorrectPosition = currPoss.join("").indexOf(pos.join(""));

    if (onCorrectPosition > -1) {
        return correctKeyStyle;
    }

    return misplacedKeyStyle;
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
        <div className="flex flex-col justify-center items-center gap-1 mt-5">
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
