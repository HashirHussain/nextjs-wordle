"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                    <a
                        title="github link"
                        rel="noopener"
                        href="https://github.com/HashirHussain/nextjs-wordle/"
                        className="mr-5 hover:text-gray-900 text-xl cursor-pointer"
                        target="_blank"
                    >
                        <FaGithub />
                    </a>
                    <a
                        title="linkedIn link"
                        rel="noopener"
                        href="https://www.linkedin.com/in/hashir-hussain/"
                        className="mr-5 hover:text-sky-700 text-xl cursor-pointer"
                        target="_blank"
                    >
                        <FaLinkedin />
                    </a>
                </nav>
                <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                    <span className="ml-3 text-xl">Wordle</span>
                </a>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}
