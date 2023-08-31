import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiCornerDownLeft } from "react-icons/fi";

const keyStyle = `flex grow shrink basis-px
items-center justify-center
select-none
px-3 py-1 sm:py-2 border-2 border-gray-200
hover:border-gray-300 active:border-gray-400
bg-slate-200 hover:bg-slate-300 active:bg-slate-400
rounded
cursor-pointer
text-1xl sm:text-2xl`;

export default function Keyboard({
    onKeyboardClick,
}: {
    onKeyboardClick: (arg0: string) => void;
}) {
    return (
        <div className="flex flex-col justify-center gap-1 uppercase font-semibold">
            <div className="flex flex-row justify-stretch gap-x-1">
                <div className={keyStyle} onClick={() => onKeyboardClick("Q")}>
                    Q
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("W")}>
                    W
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("E")}>
                    E
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("R")}>
                    R
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("T")}>
                    T
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("Y")}>
                    Y
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("U")}>
                    U
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("I")}>
                    I
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("O")}>
                    O
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("P")}>
                    P
                </div>
            </div>
            <div className="flex flex-row justify-stretch gap-x-1">
                <div className={keyStyle} onClick={() => onKeyboardClick("A")}>
                    A
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("S")}>
                    S
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("D")}>
                    D
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("F")}>
                    F
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("G")}>
                    G
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("H")}>
                    H
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("J")}>
                    J
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("K")}>
                    K
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("L")}>
                    L
                </div>
            </div>
            <div className="flex flex-row justify-stretch gap-x-1">
                <div className={keyStyle} onClick={() => onKeyboardClick("Backspace")}>
                    &nbsp;&nbsp;
                    <FiArrowLeft />
                    &nbsp;&nbsp;
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("Z")}>
                    Z
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("X")}>
                    X
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("C")}>
                    C
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("V")}>
                    V
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("B")}>
                    B
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("N")}>
                    N
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("M")}>
                    M
                </div>
                <div className={keyStyle} onClick={() => onKeyboardClick("Enter")}>
                    &nbsp;&nbsp;
                    <FiCornerDownLeft />
                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    );
}
