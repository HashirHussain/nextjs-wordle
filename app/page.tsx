"use client";

import { useEffect, useRef, useState } from "react";
import Keyboard from "./components/Keyboard";
import {
  ALPHABETS,
  backspaceKey,
  enterKey,
  keyboardEvent,
} from "./lib/alphabets";

const blockStyle = `h-12 w-12 sm:w-14 sm:h-14 grid place-items-center p-0 m-0 font-bold text-2xl border-2 rounded-md border-gray-200 uppercase`;

const getChances = (count: number) => {
  return Array(count).fill(null);
};

const getLettersBlock = (count: number) => {
  return Array(count).fill(null);
};

type blockValuesType = Array<Array<string | null>>;

export default function Home() {
  const [lettersLimit, setLettersLimit] = useState<number>(4);
  const [chanceLimit, setChanceLimit] = useState<number>(6);
  const [wordsList, setWordsList] = useState<Array<string>>([]);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [blockValues, setBlockValues] = useState<blockValuesType>([]);

  function blockEventHandler(key: string) {
    const _key = key.toLowerCase();
    if (_key === enterKey && blockValues[selectedRow].length >= lettersLimit) {
      setSelectedRow(selectedRow + 1);
    } else if (_key === backspaceKey && blockValues[selectedRow].length !== 0) {
      const result = handleBackspace(blockValues, selectedRow);
      setBlockValues([...result]);
    } else {
      const result = fillBlock(_key, blockValues, selectedRow, lettersLimit);
      setBlockValues([...result]);
    }
  }

  const KeyUpHandler = (event: {
    key: string;
    stopPropagation: () => void;
  }) => {
    const key = event.key;
    event.stopPropagation();
    blockEventHandler(key);
  };

  useEffect(() => {
    const initialValues = Array(chanceLimit).fill([]);
    setBlockValues([...initialValues]);
    return () => { };
  }, [chanceLimit, lettersLimit]);

  const handlerKeyboardRef = useRef(KeyUpHandler);
  handlerKeyboardRef.current = KeyUpHandler;
  useEffect(() => {
    document.addEventListener(keyboardEvent, (event) =>
      handlerKeyboardRef.current(event)
    );
    return () => {
      document.removeEventListener(keyboardEvent, handlerKeyboardRef.current);
    };
  }, []);

  if (blockValues.length === 0) {
    return;
  }

  return (
    <section className="flex flex-col justify-center m-auto max-w-2xl w-full relative">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="blocks-wrapper flex flex-col gap-y-1 my-2">
          {getChances(chanceLimit).map((_, rowIndex: number) => {
            return (
              <div key={`row-${rowIndex}`} className="flex gap-x-1">
                {getLettersBlock(lettersLimit).map((_, blockIndex: number) => {
                  return (
                    <div
                      key={`block-${rowIndex}-${blockIndex}`}
                      className={blockStyle}
                    >
                      {blockValues[rowIndex][blockIndex]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Keyboard onKeyboardClick={blockEventHandler} />
      </div>
    </section>
  );
}

const handleBackspace = (values: blockValuesType, selectedRow: number) => {
  const currentValue = values[selectedRow];
  currentValue.pop();
  values[selectedRow] = [...currentValue];
  return values;
};

const fillBlock = (
  key: string,
  values: blockValuesType,
  selectedRow: number,
  lettersLimit: number
) => {
  if (values[selectedRow].length === lettersLimit) {
    return values;
  }
  if (ALPHABETS.indexOf(key) !== -1) {
    const row = [...values[selectedRow]];
    row.push(key);
    const newValue = values;
    newValue[selectedRow] = [...row];
    return newValue;
  }
  return values;
};
