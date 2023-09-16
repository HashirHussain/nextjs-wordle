import React from "react";
import { FiRotateCcw, FiFrown } from "react-icons/fi";
import { grid as gridSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

type Props = {
    onRestart: () => void;
    onGiveUp: () => void;
};

export default function CTA({ onRestart, onGiveUp }: Props) {
    const grid = useSelector(gridSelector);
    if (grid.length === 0) {
        return null;
    }
    return (
        <div className="flex mt-5">
            <button
                type="button"
                tabIndex={-1}
                onClick={onRestart}
                className="text-gray-50 bg-sky-600 hover:bg-sky-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
            >
                <FiRotateCcw />
                <span className="ml-1">Restart</span>
            </button>
            <button
                type="button"
                tabIndex={-1}
                onClick={onGiveUp}
                className="text-gray-50 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                <FiFrown />
                <span className="ml-1">Give Up</span>
            </button>
        </div>
    );
}
