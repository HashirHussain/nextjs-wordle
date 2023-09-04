"use client";

import { useEffect, useRef, useState } from "react";
import Keyboard from "./components/Keyboard";
import PlayBoard from "./components/PlayBoard";
import {
  backspaceKey,
  blocksValueType,
  fillBlock,
  handleBackspace,
  hasEnterTriggered,
  keyboardEvent,
} from "./lib";

export default function Game({
  words,
  correctAnswer,
}: {
  words: Array<string>;
  correctAnswer: string;
}) {
  const [lettersLimit, setLettersLimit] = useState<number>(4);
  const [chanceLimit, setChanceLimit] = useState<number>(6);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [blocksValue, setBlocksValue] = useState<blocksValueType>([]); //Holds grid values while input
  const [submittedWords, setSubmittedWords] = useState<blocksValueType>([]); //Holds grid value on enter key press

  function blockEventHandler(key: string) {
    const _key = key.toLowerCase();
    if (
      hasEnterTriggered(
        _key,
        blocksValue,
        selectedRow,
        lettersLimit,
        chanceLimit
      )
    ) {
      const _submittedWords = [...submittedWords];
      _submittedWords[selectedRow] = [...blocksValue[selectedRow]];
      setSubmittedWords([..._submittedWords]);
      setSelectedRow(selectedRow + 1);
    } else if (_key === backspaceKey && blocksValue[selectedRow].length !== 0) {
      const result = handleBackspace(blocksValue, selectedRow);
      setBlocksValue([...result]);
    } else {
      const result = fillBlock(_key, blocksValue, selectedRow, lettersLimit);
      setBlocksValue([...result]);
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
    setBlocksValue([...initialValues]);
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

  // If Grid is not set yet
  if (blocksValue.length === 0) {
    return;
  }

  return (
    <>
      <PlayBoard
        submittedWords={submittedWords}
        chanceLimit={chanceLimit}
        lettersLimit={lettersLimit}
        blocksValue={blocksValue}
        correctAnswer={correctAnswer}
      />
      <Keyboard
        onKeyboardClick={blockEventHandler}
        blocksValue={blocksValue}
        correctAnswer={correctAnswer}
        lastWord={blocksValue[selectedRow - 1]}
      />
    </>
  );
}
