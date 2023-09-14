import { useDispatch, useSelector } from "react-redux";
import ThemeSwitcher from "./ThemeSwitcher";

import {
    letterLimit as letterLimitSelector,
    chanceLimit as chanceLimitSelector,
} from "../redux/selectors";
import {
    updateLetterLimit,
    updateChanceLimit,
} from "../redux/settings-reducer";

const selectedClass = (letterLimit: number, current: number | undefined) => {
    if (current && letterLimit === current) {
        return `bg-lime-600 border-lime-600`;
    }

    return `bg-gray-500 border-gray-500`;
};

const LimitButton = ({
    currentLimit,
    onClick,
    value,
}: {
    currentLimit: number;
    onClick: (arg0: number) => void;
    value: number;
}) => {
    return (
        <button
            type="button"
            onClick={() => onClick(value)}
            disabled={currentLimit === value}
            className={`h-8 w-8 sm:w-8 sm:h-8 grid place-items-center p-0 m-0 font-bold border-2 rounded-md uppercase ${selectedClass(
                currentLimit,
                value
            )} hover:bg-lime-600 hover:border-lime-600 dark:bg-grey-600 dark:border-grey-600 text-gray-50`}
            tabIndex={-1}
        >
            {value}
        </button>
    );
};

export default function Settings({ onClose }: { onClose: () => void }) {
    const letterLimit: number = useSelector(letterLimitSelector);
    const chanceLimit = useSelector(chanceLimitSelector);

    const dispatch = useDispatch();
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex sm:min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-700">
                            <div className="sm:flex sm:items-start flex-col">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                                    Settings
                                </h3>
                                <div className="flex flex-col w-full">
                                    <div className="mt-3 flex flex-col">
                                        <h1 className="text-1xl">Number of letters</h1>
                                        <div className="flex gap-x-1">
                                            <LimitButton
                                                currentLimit={letterLimit}
                                                onClick={(value) => dispatch(updateLetterLimit(value))}
                                                value={4}
                                            />
                                            <LimitButton
                                                currentLimit={letterLimit}
                                                onClick={(value) => dispatch(updateLetterLimit(value))}
                                                value={5}
                                            />
                                            <LimitButton
                                                currentLimit={letterLimit}
                                                onClick={(value) => dispatch(updateLetterLimit(value))}
                                                value={6}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 flex flex-col">
                                        <h1 className="text-1xl">Number of chances</h1>
                                        <div className="flex gap-x-1">
                                            <LimitButton
                                                currentLimit={chanceLimit}
                                                onClick={(value) => dispatch(updateChanceLimit(value))}
                                                value={6}
                                            />
                                            <LimitButton
                                                currentLimit={chanceLimit}
                                                onClick={(value) => dispatch(updateChanceLimit(value))}
                                                value={9}
                                            />
                                            <LimitButton
                                                currentLimit={chanceLimit}
                                                onClick={(value) => dispatch(updateChanceLimit(value))}
                                                value={12}
                                            />
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
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t-[1px] border-zinc-200 dark:border-gray-500 dark:bg-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-10 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
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
