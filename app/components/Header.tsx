"use client";
import { FaQuestion } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export default function Header() {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 justify-center items-center gap-x-6">
                <button
                    type="button"
                    title="how to play"
                    className="inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                >
                    <FaQuestion />
                </button>
                <h4 className="uppercase tracking-widest">Wordle</h4>
                <button
                    type="button"
                    title="how to play"
                    className="inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                >
                    <FiSettings />
                </button>
            </div>
        </header>
    );
}
