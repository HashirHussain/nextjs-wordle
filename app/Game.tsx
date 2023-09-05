"use client";

import { useEffect, useRef, useState } from "react";
import Alert from "./components/Alert";
import Keyboard from "./components/Keyboard";
import PlayBoard from "./components/PlayBoard";
import {
  BACKSPACE_KEY,
  KEYBOARD_EVENT,
  blocksValueType,
  fillBlock,
  getChosenAnswer,
  handleBackspace,
  hasEnterTriggered,
} from "./lib";

export default function Game({ wordsList }: { wordsList: Array<string> }) {
  const [lettersLimit, setLettersLimit] = useState<number>(4);
  const [chanceLimit, setChanceLimit] = useState<number>(6);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [blocksValue, setBlocksValue] = useState<blocksValueType>([]); //Holds grid values while input
  const [submittedWords, setSubmittedWords] = useState<blocksValueType>([]); //Holds the current row values
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    getChosenAnswer(wordsList)
  );
  const [alertMessage, setAlertMessage] = useState<string>("");

  function blockEventHandler(key: string) {
    setAlertMessage("");
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
      const currentValues = [...blocksValue[selectedRow]];
      const _submittedWords = [...submittedWords];

      if (wordsList.indexOf(currentValues.join("")) === -1) {
        setAlertMessage("Not in word list");
        return;
      }

      _submittedWords[selectedRow] = [...currentValues];
      setSubmittedWords([..._submittedWords]);
      setSelectedRow(selectedRow + 1);
    } else if (
      _key === BACKSPACE_KEY &&
      blocksValue[selectedRow].length !== 0
    ) {
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
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (alertMessage) {
      timeoutId = setTimeout(() => {
        setAlertMessage("");
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [alertMessage]);

  useEffect(() => {
    const initialValues = Array(chanceLimit).fill([]);
    setBlocksValue([...initialValues]);
    return () => { };
  }, [chanceLimit, lettersLimit]);

  const handlerKeyboardRef = useRef(KeyUpHandler);
  handlerKeyboardRef.current = KeyUpHandler;
  useEffect(() => {
    document.addEventListener(KEYBOARD_EVENT, (event) =>
      handlerKeyboardRef.current(event)
    );
    return () => {
      document.removeEventListener(KEYBOARD_EVENT, handlerKeyboardRef.current);
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
        correctAnswer={correctAnswer}
        submittedWords={submittedWords}
      />
      {alertMessage && <Alert message={alertMessage} />}
    </>
  );
}
