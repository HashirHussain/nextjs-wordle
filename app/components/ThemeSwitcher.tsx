"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const CurrentIcon = (theme: string | undefined) => {
    if (theme === "light") {
        return <FiSun />;
    }

    if (theme === "dark") {
        return <FiMoon />;
    }
    return <FiMonitor />;
};

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const [showList, setShowList] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const setCurrentTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    };

    return (
        <button
            type="button"
            title={`current theme is ${theme}`}
            onClick={() => setCurrentTheme()}
            className={`inline-flex items-center bg-gray-100 dark:bg-gray-500 border-gray-500 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 dark:bg-grey-600 dark:border-grey-600 dark:text-gray-50 rounded text-base md:mt-0`}
        >
            {theme === "light" && <FiSun />}
            {theme === "dark" && <FiMoon />}
            {theme === "system" && <FiMonitor />}
        </button>
    );

    // Below approach is another way to set theme
    return (
        <>
            <button
                type="button"
                title="light"
                onClick={() => setTheme("light")}
                className={`inline-flex items-center ${theme === "light"
                    ? "bg-lime-600 border-lime-600"
                    : "bg-gray-500 border-gray-500"
                    }  border-0 py-2 px-3 focus:outline-none hover:bg-lime-600 hover:border-lime-600 dark:bg-grey-600 dark:border-grey-600 text-gray-50 rounded text-base mt-4 md:mt-0`}
            >
                <FiSun />
            </button>
            <button
                type="button"
                title="dark"
                onClick={() => setTheme("dark")}
                className={`inline-flex items-center ${theme === "dark"
                    ? "bg-lime-600 border-lime-600"
                    : "bg-gray-500 border-gray-500"
                    } border-0 py-2 px-3 focus:outline-none hover:bg-lime-600 hover:border-lime-600 dark:bg-grey-600 dark:border-grey-600 text-gray-50 rounded text-base mt-4 md:mt-0`}
            >
                <FiMoon />
            </button>
            <button
                type="button"
                title="auto"
                onClick={() => setTheme("system")}
                className={`inline-flex items-center ${theme === "system"
                    ? "bg-lime-600 border-lime-600"
                    : "bg-gray-500 border-gray-500"
                    } border-0 py-2 px-3 focus:outline-none hover:bg-lime-600 hover:border-lime-600 dark:bg-grey-600 dark:border-grey-600 text-gray-50 rounded text-base mt-4 md:mt-0`}
            >
                <FiMonitor />
            </button>
            {/* <div className="relative">
                <select
                    title="theme selector"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="theme-state"
                    onChange={(e) => setTheme(e.target.value)}
                >
                    <option value={"light"}>Light</option>
                    <option value={"dark"}>Dark</option>
                    <option value={"system"}>System</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div> */}
        </>
    );
};

export default ThemeSwitcher;
