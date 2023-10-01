import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { useSelector } from "react-redux";
import { dictionary as dictionarySelector } from "../redux/selectors";

type Props = {
    onClose: () => void;
};

const Message = ({ message }: { message: string }) => {
    return <span className="text-sm dark:text-gray-100">{message}</span>;
};

const generateLink = (word: string) => {
    const href = window.location.origin;
    const pathname = window.location.pathname;
    var cipherText = btoa(word);
    return `${href}${pathname}?challenge=${cipherText}`;
}

export default function ChallengeFriend({ onClose }: Props) {
    const dictionary = useSelector(dictionarySelector);
    const [word, setWord] = useState("");
    const [message, setMessage] = useState("");
    const [link, setLink] = useState("");

    const getLink = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (dictionary.includes(word.toLowerCase()) === false) {
            setMessage("word not found!");
        } else {
            const link = generateLink(word.toLowerCase());
            setLink(link);
            navigator.clipboard.writeText(link)
            setMessage(`link copied!`)
        }
    };
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
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                    <h1
                                        className="font-semibold leading-6 text-gray-600 text-2xl dark:text-white"
                                        id="modal-title"
                                    >
                                        Wordle Generator
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-300 my-3">
                                        Challenge your friend with any word from 4 to 6 letters:
                                    </p>
                                    <form onSubmit={getLink}>
                                        <label
                                            htmlFor="default-search"
                                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                        >
                                            Search
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                onChange={(e) => setWord(e.target.value)}
                                                className="appearance-none block w-full p-4 bg-gray-200 text-gray-700 border rounded  mb-3 leading-tight focus:outline-none focus:bg-white"
                                                placeholder="Your Word..."
                                                required
                                            />
                                            <button
                                                title="copy link"
                                                type="submit"
                                                className="absolute right-2.5 bottom-2.5 bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 dark:bg-gray-500 dark:text-white rounded"
                                            >
                                                <FiLink />
                                            </button>
                                        </div>
                                        <Message message={message} />
                                    </form>
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
