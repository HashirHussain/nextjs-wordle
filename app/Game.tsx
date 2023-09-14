"use client";

import { useEffect, useRef, useState } from "react";
import Alert from "./components/Alert";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Header from "./components/Header";
import KeyBoard from "./components/Keyboard";
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

import { useSelector } from "react-redux";
import { letterLimit as letterLimitSelector } from "./redux/selectors";

const alertMessages = {
  GUESS_FIRST_WORD: (
    <span className="tracking-widest">{"Guess the first word!"}</span>
  ),
  GAME_END: <span>{"Game End! Press restart to begin."}</span>,
  YOU_WON: <span>{"You Won"}</span>,
  WORD_NOT_FOUND: <span>{"Word not found"}</span>,
  YOU_LOST: (word: string) => (
    <span>
      {"You lost! Correct word was"} <span className="uppercase">{word}</span>{" "}
    </span>
  ),
};

export default function Game({ wordsList }: { wordsList: Array<string> }) {
  const letterLimit = useSelector(letterLimitSelector);

  const [correctAnswer, setCorrectAnswer] = useState<string>(
    pickRandom(wordsList, letterLimit)
  );
  const [alertMessage, setAlertMessage] = useState<any>(null);
  const [grid, setGrid] = useState<blocksValueType>([]); // Holds letters while key press
  const [tempWord, setTempWord] = useState<Array<string>>([]); // Holds current row letters
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameEnd, setGameEnd] = useState<boolean>(false);

  function keyPressHandler(key: string) {
    setAlertMessage(null); // Hide alert box immediately after key press
    if (gameEnd) {
      setAlertMessage(alertMessages.GAME_END);
      return;
    }
    if (currentRow === CHANCE_LIMIT) {
      // Game has finished already
      return;
    }
    if (isAlphabetPressed(key)) {
      if (tempWord.length < letterLimit) {
        tempWord.push(key.toLowerCase());
        setTempWord([...tempWord]);
      }

      return;
    }

    if (isEnterPressed(key)) {
      const value = tempWord;
      if (value.length === letterLimit) {
        if (wordsList.indexOf(value.join("")) === -1) {
          setAlertMessage(alertMessages.WORD_NOT_FOUND);
          return;
        }
        if (value.join("") === correctAnswer) {
          // <-- Wining condition
          setTempWord([]);
          grid[currentRow] = [...value];
          setGrid([...grid]);
          setAlertMessage(alertMessages.YOU_WON);
          setGameEnd(true);
          return;
        }
        if (currentRow + 1 === CHANCE_LIMIT) {
          // This was the final enter press
          setAlertMessage(alertMessages.YOU_LOST(correctAnswer));
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

  const KeyUpHandler = (event: any) => {
    if (event.ctrlKey) {
      return;
    }
    const key = event.key;
    event.stopPropagation();
    keyPressHandler(key);
  };

  const onRestartHandler = () => {
    resetGame();
  };

  const onGiveUpHandler = (e: any) => {
    if (grid.flat().length && gameEnd === false) {
      setAlertMessage(
        <span className="uppercase tracking-widest">{correctAnswer}</span>
      );
    } else {
      setAlertMessage(<span>{"Game End! Press restart to begin."}</span>);
    }
    setGameEnd(true);
  };

  const resetGame = () => {
    setCurrentRow(0);
    setTempWord([]);
    setGrid([]);
    setCorrectAnswer(pickRandom(wordsList, letterLimit));
    setGameEnd(false);
    setAlertMessage(alertMessages.GUESS_FIRST_WORD);
  };

  useEffect(() => {
    resetGame();
  }, [letterLimit, wordsList]);

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
        <PlayBoard
          grid={grid}
          currentRow={currentRow}
          tempWord={tempWord}
          correctAnswer={correctAnswer}
        />
        <KeyBoard
          onKeyboardClick={keyPressHandler}
          correctAnswer={correctAnswer}
          grid={grid}
        />
        {grid.flat().length > 0 ? (
          <CTA onRestart={onRestartHandler} onGiveUp={onGiveUpHandler} />
        ) : null}
        <Footer />
      </div>
    </>
  );
}
