import { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import HowTo from "./HowTo";
import Settings from "./Settings";

export default function Header() {
    const [showHowTo, setShowHowTo] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    return (
        <>
            <header className="flex justify-center items-center gap-x-6 my-4">
                <button
                    type="button"
                    title="how to play"
                    onClick={() => setShowHowTo(true)}
                    className="bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 dark:bg-gray-500 dark:text-white rounded text-base md:mt-0"
                >
                    <FaQuestion />
                </button>
                <h4 className="uppercase tracking-widest dark:text-white">Wordle</h4>
                <button
                    type="button"
                    title="how to play"
                    data-modal-target="setting-modal"
                    onClick={() => setShowSettings(!showSettings)}
                    className="bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 dark:bg-gray-500 dark:text-gray-50 rounded text-base md:mt-0"
                >
                    <FiSettings />
                </button>
            </header>
            {showHowTo && <HowTo onClose={() => setShowHowTo(false)} />}
            {showSettings && <Settings onClose={() => setShowSettings(false)} />}
        </>
    );
}
