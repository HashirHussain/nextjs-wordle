import { FaTrophy } from "react-icons/fa";

type Props = {
    onClose: () => void;
};

export default function HowTo({ onClose }: Props) {
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:border-gray-500 dark:bg-gray-700">
                            <div className="sm:flex sm:items-start ">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h1
                                        className="font-semibold leading-6 text-gray-600 text-2xl dark:text-white"
                                        id="modal-title"
                                    >
                                        How to play
                                    </h1>
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                            You have to guess the hidden word in 6 tries and the color
                                            of the letters changes to show how close you are. <br />
                                            <br />
                                            To start the game, just enter any word, for example:
                                        </p>
                                        <div className="flex gap-x-1 mt-3">
                                            <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-gray-500 border-gray-500 dark:bg-gray-500 dark:border-gray-500 text-gray-50">
                                                C
                                            </div>
                                            <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                O
                                            </div>
                                            <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-gray-500 border-gray-500 dark:bg-gray-500 dark:border-gray-500 text-gray-50">
                                                L
                                            </div>
                                            <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-amber-400 border-amber-400 dark:bg-amber-400 dark:border-amber-400 text-gray-50">
                                                D
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-3 p-3 bg-slate-50 dark:border-gray-500 dark:bg-gray-500 dark:text-white rounded-md gap-2">
                                            <div className="flex items-center text-left">
                                                <span className="w-7 h-7 sm:w-7 sm:h-7 grid place-items-center p-0 m-0 font-bold  border-2 rounded-md uppercase bg-gray-500 border-gray-500 dark:bg-gray-600 dark:border-gray-600 text-gray-50">
                                                    C
                                                </span>
                                                <span className="mx-1">,</span>
                                                <span className="w-7 h-7 sm:w-7 sm:h-7 grid place-items-center p-0 m-0 font-bold  border-2 rounded-md uppercase bg-gray-500 border-gray-500 dark:bg-gray-600 dark:border-gray-600 text-gray-50">
                                                    L
                                                </span>
                                                <p className="ml-2 text-sm">{`aren't in the target word at all.`}</p>
                                            </div>
                                            <div className="flex items-center text-left">
                                                <span className="h-7 w-7 sm:w-7 sm:h-7 grid place-items-center p-0 m-0 font-bold border-2 rounded-md uppercase bg-amber-400 border-amber-400 dark:bg-amber-400 dark:border-amber-400 text-gray-50">
                                                    D
                                                </span>
                                                <p className="ml-2 text-sm">{`is in the word but in the wrong spot.`}</p>
                                            </div>
                                            <div className="flex items-center text-left">
                                                <span className="h-7 w-7 sm:w-7 sm:h-7 grid place-items-center p-0 m-0 font-bold border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    O
                                                </span>
                                                <p className="ml-2 text-sm">{` is in the word and in the correct spot.`}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-3">
                                            <p className="ml-2 text-sm dark:text-gray-300">
                                                Another try to find matching letters in the target word.
                                            </p>
                                            <div className="flex gap-x-1 mt-3">
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-gray-500 border-gray-500 dark:bg-gray-500 dark:border-gray-500 text-gray-50">
                                                    M
                                                </div>
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    I
                                                </div>
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    L
                                                </div>
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    K
                                                </div>
                                            </div>
                                            <p className="my-2 text-sm dark:text-gray-300">{` so close.`}</p>
                                            <div className="flex gap-x-1 ">
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    S
                                                </div>
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    I
                                                </div>
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    L
                                                </div>
                                                <div className="h-10 w-10 sm:w-12 sm:h-12 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md uppercase bg-lime-600 border-lime-600 dark:bg-lime-600 dark:border-lime-600 text-gray-50">
                                                    K
                                                </div>
                                            </div>
                                            <p className="inline-flex items-center my-2 text-sm font-semibold text-gray-900 dark:text-gray-300">
                                                {` Got it.`} <FaTrophy className="text-yellow-400" />{" "}
                                            </p>
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
