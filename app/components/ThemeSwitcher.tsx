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
            <div className="relative">
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
            </div>
        </>
    );
};

export default ThemeSwitcher;
