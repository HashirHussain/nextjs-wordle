import React from "react";
import { FiRotateCcw, FiFrown } from "react-icons/fi";

type Props = {
    onRestart: () => void;
    onGiveUp: (arg0: any) => void;
};

export default function CTA({ onRestart, onGiveUp }: Props) {
    return (
        <div className="flex mt-5">
            <button
                type="button"
                tabIndex={-1}
                onClick={onRestart}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <FiRotateCcw />
                <span className="ml-1">Restart</span>
            </button>
            <button
                type="button"
                tabIndex={-1}
                onClick={(e) => onGiveUp(e)}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                <FiFrown />
                <span className="ml-1">Give Up</span>
            </button>
        </div>
    );
}
