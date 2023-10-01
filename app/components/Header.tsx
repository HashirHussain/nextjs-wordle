import { useState } from "react";
import { FaPlusCircle, FaQuestion, FaWhmcs } from "react-icons/fa";
import ChallengeFriend from "./ChallengeFriend";
import HowTo from "./HowTo";
import Settings from "./Settings";
import ThemeSwitcher from "./ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { setGamePaused } from "../redux/game-reducer";

export default function Header() {
    const [showHowTo, setShowHowTo] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showChallengeFriend, setShowChallengeFriend] = useState(false);
    const dispatch = useDispatch();
    return (
        <>
            <header className="flex justify-center items-center gap-x-6 mt-2">
                <button
                    type="button"
                    title="challenge friend"
                    onClick={() => {
                        setShowChallengeFriend(true)
                        dispatch(setGamePaused(true))
                    }}
                    className="bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 dark:bg-gray-500 dark:text-white rounded text-base md:mt-0"
                >
                    <FaPlusCircle />
                </button>
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
                    <FaWhmcs />
                </button>
                <ThemeSwitcher />
            </header>
            {showChallengeFriend && (
                <ChallengeFriend onClose={() => {
                    setShowChallengeFriend(false)
                    dispatch(setGamePaused(false))
                }} />
            )}
            {showHowTo && <HowTo onClose={() => setShowHowTo(false)} />}
            {showSettings && <Settings onClose={() => setShowSettings(false)} />}
        </>
    );
}
