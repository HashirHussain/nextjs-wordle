import { FiArrowLeft, FiCornerDownLeft } from "react-icons/fi";
import { ALPHABETS, blocksValueType, findIndices } from "../lib";

const keyStyle = `flex grow shrink basis-px
items-center justify-center
px-3 py-1 sm:py-2
font-semibold text-base 
rounded-md
uppercase
cursor-pointer
select-none`;

const defaultStyle = `${keyStyle} text-gray-800 bg-gray-100 border border-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500`;
const correctKeyStyle = `${keyStyle} bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50`;
const incorrectKey = `${keyStyle} bg-gray-400 dark:bg-gray-400 text-gray-50`;
const misplacedKeyStyle = `${keyStyle} bg-amber-500 border-amber-500 dark:bg-amber-500 dark:border-amber-500 text-gray-50`;

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
                    className={defaultStyle}
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
                    className={defaultStyle}
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

const getKeyStyle = (
    key: string,
    grid: blocksValueType,
    correctAnswer: string
) => {
    if (grid.flat().indexOf(key) === -1) {
        return defaultStyle; // untouched key - default style
    }

    if (correctAnswer.indexOf(key) === -1) {
        return incorrectKey; // letter not present at all - dark style
    }

    const pos = findIndices(correctAnswer.split(""), key);
    const currPoss = grid.map((item) => findIndices(item, key)).flat();
    const onCorrectPosition = currPoss.join("").indexOf(pos.join(""));

    if (onCorrectPosition > -1) {
        return correctKeyStyle; // correct letter at right position - green style
    }

    return misplacedKeyStyle; // correct letter at wrong position - yellow style
};
