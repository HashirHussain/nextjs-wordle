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

    return (
        <>
            <button
                type="button"
                title={"Theme switcher"}
                onClick={() => setShowList(!showList)}
            >
                {CurrentIcon(theme)}
            </button>
            {showList && (
                <ul
                    className={`absolute z-50 top-6 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8`}
                    role="listbox"
                    title="theme switcher list"
                    aria-orientation="vertical"
                    tabIndex={-1}
                >
                    <li
                        className={`py-1 px-2 flex items-center cursor-pointer ${theme === "light" ? "text-sky-500" : ""
                            }`}
                        tabIndex={-1}
                        role="option"
                        aria-selected="false"
                        onClick={() => setTheme("light")}
                    >
                        <FiSun className={"mr-2"} />
                        <span>Light</span>
                    </li>
                    <li
                        className={`py-1 px-2 flex items-center cursor-pointer ${theme === "dark" ? "text-sky-500" : ""
                            }`}
                        tabIndex={-1}
                        role="option"
                        aria-selected="false"
                        onClick={() => setTheme("dark")}
                    >
                        <FiMoon className={"mr-2"} />
                        <span>Dark</span>
                    </li>
                    <li
                        className={`py-1 px-2 flex items-center cursor-pointer ${theme === "system" ? "text-sky-500" : ""
                            }`}
                        tabIndex={-1}
                        role="option"
                        aria-selected="false"
                        onClick={() => setTheme("system")}
                    >
                        <FiMonitor className={"mr-2"} />
                        <span>System</span>
                    </li>
                </ul>
            )}
        </>
    );
};

export default ThemeSwitcher;
