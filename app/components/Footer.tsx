"use client";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 justify-center items-center gap-x-6">
                <a
                    title="github link"
                    rel="noopener"
                    href="https://github.com/HashirHussain/nextjs-wordle/"
                    className="mr-5 hover:text-gray-900 dark:text-gray-50 text-xl cursor-pointer"
                    target="_blank"
                >
                    <FaGithub />
                </a>
                <a
                    title="linkedIn link"
                    rel="noopener"
                    href="https://www.linkedin.com/in/hashir-hussain/"
                    className="mr-5 hover:text-sky-700 dark:text-gray-50 text-xl cursor-pointer"
                    target="_blank"
                >
                    <FaLinkedin />
                </a>
                <a
                    title="personal portfolio"
                    rel="noopener"
                    href="http://hashirhussain.com/"
                    className="mr-5 hover:text-sky-900 dark:text-gray-50 text-xl cursor-pointer"
                    target="_blank"
                >
                    <FaLink />
                </a>
            </div>
        </footer>
    );
}
