"use client";

import { useEffect, useRef, useState } from "react";
import Alert from "./components/Alert";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Header from "./components/Header";
import KeyBoard from "./components/Keyboard";
import PlayBoard from "./components/PlayBoard";
import {
  KEYBOARD_EVENT,
  gridType,
  isAlphabetPressed,
  isDeletedPressed,
  isEnterPressed,
  pickRandom,
} from "./lib";

import { useDispatch, useSelector } from "react-redux";
import {
  pushToTempWord,
  clearTempWord,
  setCurrentSelectedRow,
  setGameEnd,
  popFromTempWord,
  setCorrectWord,
} from "./redux/game-reducer";
import {
  chanceLimit as chanceLimitSelector,
  currentSelectedRow as currentSelectedRowSelector,
  gameEnd as gameEndSelector,
  letterLimit as letterLimitSelector,
  tempWord as tempWordSelector,
  correctWord as correctWordSelector,
} from "./redux/selectors";

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
  const chanceLimit = useSelector(chanceLimitSelector);
  const gameEnd = useSelector(gameEndSelector);
  const currentSelectedRow = useSelector(currentSelectedRowSelector);
  const tempWord = useSelector(tempWordSelector);
  const correctWord = useSelector(correctWordSelector);

  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState<any>(null);
  const [grid, setGrid] = useState<gridType>([]); // Holds letters while key press

  function keyPressHandler(key: string) {
    setAlertMessage(null); // Hide alert box immediately after key press
    if (currentSelectedRow === chanceLimit) {
      // Game has finished already
      return;
    }
    if (gameEnd) {
      setAlertMessage(alertMessages.GAME_END);
      return;
    }
    if (isAlphabetPressed(key)) {
      if (tempWord.length < letterLimit) {
        dispatch(pushToTempWord(key.toLowerCase()));
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
        if (value.join("") === correctWord) {
          // <-- Wining condition
          dispatch(clearTempWord());
          grid[currentSelectedRow] = [...value];
          setGrid([...grid]);
          setAlertMessage(alertMessages.YOU_WON);
          dispatch(setGameEnd(true));
          return;
        }
        if (currentSelectedRow + 1 === chanceLimit) {
          // This was the final enter press
          setAlertMessage(alertMessages.YOU_LOST(correctWord));
          dispatch(setGameEnd(true));
        }
        dispatch(clearTempWord());
        grid[currentSelectedRow] = [...value];
        setGrid([...grid]);
        dispatch(setCurrentSelectedRow(currentSelectedRow + 1)); // Jump to the next row if game still going on
      }
      return;
    }

    if (isDeletedPressed(key)) {
      dispatch(popFromTempWord());
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

  const onGiveUpHandler = () => {
    if (grid.flat().length && gameEnd === false) {
      setAlertMessage(
        <span className="uppercase tracking-widest">{correctWord}</span>
      );
    } else {
      setAlertMessage(<span>{"Game End! Press restart to begin."}</span>);
    }
    dispatch(setGameEnd(true));
  };

  const resetGame = () => {
    dispatch(setCurrentSelectedRow(0));
    dispatch(clearTempWord());
    setGrid([]);
    dispatch(setCorrectWord(pickRandom(wordsList, letterLimit)));
    dispatch(setGameEnd(false));
    setAlertMessage(alertMessages.GUESS_FIRST_WORD);
  };

  useEffect(() => {
    resetGame();
  }, [letterLimit, wordsList, chanceLimit]);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (alertMessage) {
      timeoutId = setTimeout(() => {
        setAlertMessage(null);
      }, 2000);
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
    <div className="flex flex-col justify-center items-center">
      {alertMessage && <Alert>{alertMessage}</Alert>}
      <Header />
      <PlayBoard grid={grid} />
      <KeyBoard onKeyboardClick={keyPressHandler} grid={grid} />
      {grid.flat().length > 0 ? (
        <CTA onRestart={onRestartHandler} onGiveUp={onGiveUpHandler} />
      ) : null}
      <Footer />
    </div>
  );
}
