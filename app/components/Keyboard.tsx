import { FiArrowLeft, FiCornerDownLeft } from "react-icons/fi";
import { ALPHABETS, findIndices, intersection } from "../lib";

import {
    correctWord as correctWordSelector,
    grid as gridSelector,
} from "../redux/selectors";
import { useSelector } from "react-redux";

const keyStyle = `border-2 rounded-md sm:px-4 px-2 py-3 uppercase font-semibold text-base select-none`;

const defaultStyle = `${keyStyle} text-gray-800 bg-gray-100 border border-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500`;
const correctKeyStyle = `${keyStyle} bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50`;
const incorrectKey = `${keyStyle} bg-gray-400 border-gray-400 dark:bg-gray-400 text-gray-50`;
const misplacedKeyStyle = `${keyStyle} bg-amber-500 border-amber-500 dark:bg-amber-500 dark:border-amber-500 text-gray-50`;

export default function KeyBoard({
    onKeyboardClick,
}: {
    onKeyboardClick: (arg0: string) => void;
}) {
    const correctWord = useSelector(correctWordSelector);
    const grid = useSelector(gridSelector);

    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex flex-row justify-stretch gap-x-1">
                {ALPHABETS[0].map((key: string, index: number) => {
                    return (
                        <button
                            type="button"
                            tabIndex={-1}
                            key={`key-${key}-${index}`}
                            className={getKeyStyle(key, grid, correctWord)}
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
                            className={getKeyStyle(key, grid, correctWord)}
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
                            className={getKeyStyle(key, grid, correctWord)}
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
    grid: Array<Array<string>>,
    correctWord: string
) => {
    if (grid.flat().indexOf(key) === -1) {
        return defaultStyle; // untouched key - default style
    }

    if (correctWord.indexOf(key) === -1) {
        return incorrectKey; // letter not present at all - dark style
    }

    const indicesInCorrectWord = findIndices(correctWord.split(""), key);
    const indicesInGrid = grid.map((item) => findIndices(item, key)).flat();

    const commonIndices = intersection(indicesInCorrectWord, indicesInGrid);

    if (commonIndices.length) {
        return correctKeyStyle; // correct letter at right position - green style
    }

    return misplacedKeyStyle; // correct letter at wrong position - yellow style
};
