import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import ThemeSwitcher from "./ThemeSwitcher";


type Props = {
    onClose: () => void;
    lettersLimit: number;
    onLettersLimitChange: (arg0: number) => void;
};

const selectedClass = (
    lettersLimit: Props["lettersLimit"],
    current: number
) => {
    if (lettersLimit === current) {
        return `bg-lime-600 border-lime-600`;
    }

    return `bg-gray-500 border-gray-500`;
};

export default function Settings({ onClose, lettersLimit, onLettersLimitChange }: Props) {
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h1
                                        className="font-semibold leading-6 text-gray-600 text-2xl"
                                        id="modal-title"
                                    >
                                        Settings
                                    </h1>
                                    <div className="flex flex-col w-full justify-center items-center">
                                        <div className="mt-3 flex flex-col">
                                            <h1 className="text-1xl">Number of letters</h1>
                                            <div className="flex gap-x-1">
                                                <button
                                                    type="button"
                                                    onClick={() => onLettersLimitChange(4)}
                                                    className={`h-8 w-8 sm:w-8 sm:h-8 grid place-items-center p-0 m-0 font-bold border-2 rounded-md uppercase ${selectedClass(
                                                        lettersLimit,
                                                        4
                                                    )} hover:bg-lime-600 hover:border-lime-600 dark:bg-grey-600 dark:border-grey-600 text-gray-50`}
                                                    tabIndex={-1}
                                                >
                                                    4
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onLettersLimitChange(5)}
                                                    className={`h-8 w-8 sm:w-8 sm:h-8 grid place-items-center p-0 m-0 font-bold border-2 rounded-md uppercase ${selectedClass(
                                                        lettersLimit,
                                                        5
                                                    )} hover:bg-lime-600 hover:border-lime-600 dark:bg-grey-600 dark:border-grey-600  text-gray-50`}
                                                    tabIndex={-1}
                                                >
                                                    5
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onLettersLimitChange(6)}
                                                    className={`h-8 w-8 sm:w-8 sm:h-8 grid place-items-center p-0 m-0 font-bold border-2 rounded-md uppercase ${selectedClass(
                                                        lettersLimit,
                                                        6
                                                    )} hover:bg-lime-600 hover:border-lime-600 dark:bg-grey-600 dark:border-grey-600 text-gray-50`}
                                                    tabIndex={-1}
                                                >
                                                    6
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex flex-col">
                                            <h1 className="text-1xl">Color mode</h1>
                                            <div className="flex gap-x-1">
                                                <ThemeSwitcher />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
