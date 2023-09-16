import { useDispatch, useSelector } from "react-redux";
import {
    alertType as alertTypeSelector,
    correctWord as correctWordSelector,
} from "../redux/selectors";
import { alertMessageType, setAlertType } from "../redux/alert-reducer";
import { useEffect } from "react";

// const alertStyle = `absolute rounded px-8 py-6 bg-gray-50 border-slate-100 dark:bg-gray-500 dark:border-slate-300 dark:text-white border-1 text-gray-800 drop-shadow-2xl`;

const style = `absolute bg-gray-50 m-`;

const RenderMessage = (alertType: string, correctWord: string) => {
    if (alertType === alertMessageType.YOU_WON) {
        return <span>{"You Won!"}</span>;
    }

    if (alertType === alertMessageType.GUESS_FIRST_WORD) {
        return <span>{"Guess the first word!"}</span>;
    }

    if (alertType === alertMessageType.GAME_END) {
        return <span>{"Game End! Press restart to begin."}</span>;
    }

    if (alertType === alertMessageType.GIVE_UP) {
        return <span className="uppercase">{correctWord}</span>;
    }

    if (alertType === alertMessageType.WORD_NOT_FOUND) {
        return <span>{"Word not found"}</span>;
    }

    if (alertType === alertMessageType.YOU_LOST) {
        return (
            <span>
                {"You lost! Correct word was"}{" "}
                <span className="uppercase">{correctWord}</span>
            </span>
        );
    }
};

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

    return (
        <div
            className={
                "absolute tracking-widest bg-gray-600 text-white dark:bg-gray-100 dark:text-gray-500 top-1/4 w-full text-center p-10"
            }
            role="alert"
        >
            <span className="block sm:inline">
                {RenderMessage(alertType, correctWord)}
            </span>
        </div>
    );
}
