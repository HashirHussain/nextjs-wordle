import React from "react";

export default function HowTo() {
    return (
        <div className="absolute flex justify-center items-center flex-col p-3 border-2 gap-y-2 bg-white dark:bg-gray-100">
            <h1 className="font-bold text-2xl">How To Play</h1>
            <p title="description">
                You have to guess the hidden word in 6 tries and the color of the
                letters changes to show how close you are.
            </p>
            <p title="description">
                To start the game, just enter any word, for example:
            </p>
        </div>
    );
}
