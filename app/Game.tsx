"use client";

import { useEffect, useRef, useState } from "react";
import Alert from "./components/Alert";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Header from "./components/Header";
import KeyBoard from "./components/KeyBoard";
import PlayBoard from "./components/PlayBoard";
import {
  CHANCE_LIMIT,
  KEYBOARD_EVENT,
  blocksValueType,
  isAlphabetPressed,
  isDeletedPressed,
  isEnterPressed,
  pickRandom,
} from "./lib";

export default function Game({ wordsList }: { wordsList: Array<string> }) {
  const [lettersLimit, setLettersLimit] = useState<number>(4);
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    pickRandom(wordsList)
  );
  const [alertMessage, setAlertMessage] = useState<any>(null);
  const [grid, setGrid] = useState<blocksValueType>([]); // Holds letters while key press
  const [tempWord, setTempWord] = useState<Array<string>>([]); // Holds current row letters
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameEnd, setGameEnd] = useState<boolean>(false);

  function keyPressHandler(key: string) {
    setAlertMessage(null); // Hide alert box immediately after key press
    if (gameEnd) {
      setAlertMessage(<span>{"Game End! Press restart to begin."}</span>);
      return;
    }
    if (currentRow === CHANCE_LIMIT) {
      // Game has finished already
      return;
    }
    if (isAlphabetPressed(key)) {
      if (tempWord.length < lettersLimit) {
        tempWord.push(key.toLowerCase());
        setTempWord([...tempWord]);
      }

      return;
    }

    if (isEnterPressed(key)) {
      const value = tempWord;
      if (value.length === lettersLimit) {
        if (wordsList.indexOf(value.join("")) === -1) {
          setAlertMessage(<span>{"Not in word list"}</span>);
          return;
        }
        if (value.join("") === correctAnswer) {
          // <-- Wining condition
          setTempWord([]);
          grid[currentRow] = [...value];
          setGrid([...grid]);
          setAlertMessage(<span>{"You Won"}</span>);
          setGameEnd(true);
          return;
        }
        if (currentRow + 1 === CHANCE_LIMIT) {
          // This was the final enter press
          setAlertMessage(<span>{"You lost"}</span>);
          setGameEnd(true);
        }
        setTempWord([]);
        grid[currentRow] = [...value];
        setGrid([...grid]);
        setCurrentRow(currentRow + 1); // Jump to the next row if game still going on
      }
      return;
    }

    if (isDeletedPressed(key)) {
      if (tempWord.length > 0) {
        tempWord.pop();
        setTempWord([...tempWord]);
      }
      return;
    }
  }

  /*Fresh --- END*/

  const KeyUpHandler = (event: {
    key: string;
    stopPropagation: () => void;
  }) => {
    const key = event.key;
    event.stopPropagation();
    keyPressHandler(key);
  };

  const onRestartHandler = () => {
    resetGame();
  };

  const onGiveUpHandler = (e: any) => {
    if (grid.flat().length) {
      setAlertMessage(
        <span className="uppercase tracking-widest">{correctAnswer}</span>
      );
    }
    setGameEnd(true);
  };

  const resetGame = () => {
    setCurrentRow(0);
    setCorrectAnswer(pickRandom(wordsList));
    setTempWord([]);
    setGrid([]);
    setGameEnd(false);
    setAlertMessage(
      <span className="uppercase tracking-widest">{'Guess the first word!'}</span>
    );
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

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {alertMessage && <Alert>{alertMessage}</Alert>}
        <Header />
        {/* <HowTo /> */}
        <PlayBoard
          grid={grid}
          currentRow={currentRow}
          tempWord={tempWord}
          lettersLimit={lettersLimit}
          correctAnswer={correctAnswer}
        />
        <KeyBoard
          onKeyboardClick={keyPressHandler}
          correctAnswer={correctAnswer}
          grid={grid}
        />
        <CTA onRestart={onRestartHandler} onGiveUp={onGiveUpHandler} />
        {/* <Modal /> */}
        <Footer />
      </div>
    </>
  );
}
