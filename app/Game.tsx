"use client";

import { useEffect, useRef, useState, JSX } from "react";
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
import CTA from "./components/CTA";
import Header from "./components/Header";

export default function Game({ wordsList }: { wordsList: Array<string> }) {
  const [lettersLimit, setLettersLimit] = useState<number>(4);
  const [chanceLimit, setChanceLimit] = useState<number>(6);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [blocksValue, setBlocksValue] = useState<blocksValueType>([]); //Holds grid values while input
  const [submittedWords, setSubmittedWords] = useState<blocksValueType>([]); //Holds the current row values
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    getChosenAnswer(wordsList)
  );
  const [alertMessage, setAlertMessage] = useState<any>(null);

  function blockEventHandler(key: string) {
    setAlertMessage(null);
    const _key = key.toLowerCase();
    if (hasEnterTriggered(_key)) {
      if (selectedRow + 1 === chanceLimit) {
        resetWithMessage(<span>{"You lost"}</span>);
        return;
      }
      const currentValues = [...blocksValue[selectedRow]];

      if (currentValues.length < lettersLimit) {
        setAlertMessage(<span>{"Too short"}</span>);
        return;
      }

      if (currentValues.join("") === correctAnswer) {
        resetWithMessage(<span>{"You won"}</span>);
        return;
      }
      const _submittedWords = [...submittedWords];

      if (wordsList.indexOf(currentValues.join("")) === -1) {
        setAlertMessage(<span>{"Not in word list"}</span>);
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

  const onRestartHandler = () => {
    resetGame();
  };

  const resetWithMessage = (message: JSX.Element) => {
    setAlertMessage(message);
    setTimeout(() => {
      resetGame();
    }, 1500);
  };

  const onGiveUpHandler = (e: any) => {
    if (blocksValue.flat().length) {
      resetWithMessage(
        <span className="uppercase tracking-widest">{correctAnswer}</span>
      );
    }
  };

  const resetGame = () => {
    setSelectedRow(0);
    setCorrectAnswer(getChosenAnswer(wordsList));
    setSubmittedWords([]);
    setDefaultGrid();
  };

  const setDefaultGrid = () => {
    const initialValues = Array(chanceLimit).fill([]);
    setBlocksValue([...initialValues]);
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (alertMessage) {
      timeoutId = setTimeout(() => {
        setAlertMessage(null);
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [alertMessage]);

  useEffect(() => {
    setDefaultGrid();
    return () => { };
  }, []); // chanceLimit, lettersLimit

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

  console.log("Correct answer for debugging purpose -->", correctAnswer);

  // If Grid is not set yet
  if (blocksValue.length === 0) {
    return;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-10">
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
        <CTA onRestart={onRestartHandler} onGiveUp={onGiveUpHandler} />
        {alertMessage && <Alert>{alertMessage}</Alert>}
      </div>
    </>
  );
}
