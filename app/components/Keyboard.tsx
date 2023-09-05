import { FiArrowLeft, FiCornerDownLeft } from "react-icons/fi";
import { ALPHABETS, blocksValueType } from "../lib";

const keyStyle = `flex grow shrink basis-px
items-center justify-center
px-3 py-1 sm:py-2
font-semibold text-gray-800
bg-gray-100 active:bg-gray-200
border border-gray-200 hover:border-gray-300 active:border-gray-400
rounded-md
dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500
cursor-pointer`;

const getKeyStyle = (lastWord: Array<string>, correctAnswer: string, key: string) => {
    return keyStyle;
};

export default function Keyboard({
    onKeyboardClick,
    blocksValue,
    correctAnswer,
    lastWord
}: {
    onKeyboardClick: (arg0: string) => void;
    blocksValue: blocksValueType;
    correctAnswer: string;
    lastWord: Array<string>;
}) {
    return (
        <div className="flex flex-col justify-center items-center gap-1 uppercase">
            <div className="flex flex-row justify-stretch gap-x-1">
                {ALPHABETS[0].map(
                    (key: string, index: number) => {
                        return (
                            <div
                                key={`key-${key}-${index}`}
                                className={getKeyStyle(lastWord, correctAnswer, key)}
                                onClick={() => onKeyboardClick(key)}
                            >
                                {key}
                            </div>
                        );
                    }
                )}
            </div>
            <div className="flex flex-row justify-stretch gap-x-1">
                {ALPHABETS[1].map(
                    (key: string, index: number) => {
                        return (
                            <div
                                key={`key-${key}-${index}`}
                                className={getKeyStyle(lastWord, correctAnswer, key)}
                                onClick={() => onKeyboardClick(key)}
                            >
                                {key}
                            </div>
                        );
                    }
                )}
            </div>
            <div className="flex flex-row justify-stretch gap-x-1">
                <div
                    className={keyStyle}
                    onClick={() => onKeyboardClick("Backspace")}
                >
                    &nbsp;&nbsp;
                    <FiArrowLeft />
                    &nbsp;&nbsp;
                </div>
                {ALPHABETS[2].map(
                    (key: string, index: number) => {
                        return (
                            <div
                                key={`key-${key}-${index}`}
                                className={getKeyStyle(lastWord, correctAnswer, key)}
                                onClick={() => onKeyboardClick(key)}
                            >
                                {key}
                            </div>
                        );
                    }
                )}
                <div
                    className={keyStyle}
                    onClick={() => onKeyboardClick("Enter")}
                >
                    &nbsp;&nbsp;
                    <FiCornerDownLeft />
                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    );
}
