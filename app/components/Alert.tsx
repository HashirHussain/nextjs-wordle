import { useDispatch, useSelector } from "react-redux";
import {
    alertType as alertTypeSelector,
    correctWord as correctWordSelector,
} from "../redux/selectors";
import { alertMessageType, setAlertType } from "../redux/alert-reducer";
import { useEffect } from "react";
const alertStyle = `absolute rounded px-8 py-6 bg-gray-50 border-slate-100 dark:bg-gray-500 dark:border-slate-300 dark:text-white border-1 text-gray-800 drop-shadow-2xl`;

export default function Alert() {
    const alertType = useSelector(alertTypeSelector);
    const correctWord = useSelector(correctWordSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        let timeoutId: string | number | NodeJS.Timeout | undefined;
        if (alertType) {
            timeoutId = setTimeout(() => {
                dispatch(setAlertType(""));
            }, 2000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [alertType, dispatch]);

    if (!alertType) {
        return null;
    }
    if (alertType === alertMessageType.YOU_WON) {
        return (
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline tracking-widest">
                    <span>{"You Won!"}</span>
                </span>
            </div>
        );
    }

    if (alertType === alertMessageType.GUESS_FIRST_WORD) {
        return (
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline tracking-widest">
                    <span className="tracking-widest">{"Guess the first word!"}</span>
                </span>
            </div>
        );
    }

    if (alertType === alertMessageType.GAME_END) {
        return (
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline tracking-widest">
                    <span>{"Game End! Press restart to begin."}</span>
                </span>
            </div>
        );
    }

    if (alertType === alertMessageType.GIVE_UP) {
        return (
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline tracking-widest">
                    <span className="uppercase">{correctWord}</span>
                </span>
            </div>
        );
    }

    if (alertType === alertMessageType.WORD_NOT_FOUND) {
        return (
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline tracking-widest">
                    <span>{"Word not found"}</span>
                </span>
            </div>
        );
    }

    if (alertType === alertMessageType.YOU_LOST) {
        return (
            <div className={`${alertStyle}`} role="alert">
                <span className="block sm:inline tracking-widest">
                    <span>
                        {"You lost! Correct word was"}{" "}
                        <span className="uppercase">{correctWord}</span>
                    </span>
                </span>
            </div>
        );
    }
}
