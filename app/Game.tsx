"use client";

import { useEffect, useRef } from "react";
import Alert from "./components/Alert";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Header from "./components/Header";
import KeyBoard from "./components/Keyboard";
import PlayBoard from "./components/PlayBoard";
import {
  KEYBOARD_EVENT,
  isAlphabetPressed,
  isDeletedPressed,
  isEnterPressed,
  pickRandom,
} from "./lib";

import { useDispatch, useSelector } from "react-redux";
import { alertMessageType, setAlertType } from "./redux/alert-reducer";
import {
  clearGrid,
  clearTempWord,
  popFromTempWord,
  pushToGrid,
  pushToTempWord,
  setCorrectWord,
  setCurrentSelectedRow,
  setGameEnd,
} from "./redux/game-reducer";
import * as selector from "./redux/selectors";

export default function Game({ wordsList }: { wordsList: Array<string> }) {
  const letterLimit = useSelector(selector.letterLimit);
  const chanceLimit = useSelector(selector.chanceLimit);
  const gameEnd = useSelector(selector.gameEnd);
  const currentSelectedRow = useSelector(selector.currentSelectedRow);
  const tempWord = useSelector(selector.tempWord);
  const correctWord = useSelector(selector.correctWord);
  const grid = useSelector(selector.grid);

  const dispatch = useDispatch();
  function keyPressHandler(key: string) {
    dispatch(setAlertType("")); // Hide alert box immediately after key press
    if (currentSelectedRow === chanceLimit || gameEnd) {
      // Game has finished already
      dispatch(setAlertType(alertMessageType.GAME_END));
      return;
    }
    if (isAlphabetPressed(key)) {
      if (tempWord.length < letterLimit) {
        dispatch(pushToTempWord(key.toLowerCase()));
      }

      return;
    }

    if (isEnterPressed(key)) {
      const value = Object.assign([], tempWord, { selected: false });
      if (value.length !== letterLimit) {
        return;
      }
      if (wordsList.indexOf(value.join("")) === -1) {
        dispatch(setAlertType(alertMessageType.WORD_NOT_FOUND));
        return;
      }
      if (value.join("") === correctWord) {
        // <-- Wining condition
        dispatch(clearTempWord());
        dispatch(pushToGrid(value));
        dispatch(setAlertType(alertMessageType.YOU_WON));
        dispatch(setGameEnd(true));
        return;
      }
      if (currentSelectedRow + 1 === chanceLimit) {
        // This was the final enter press
        dispatch(setAlertType(alertMessageType.YOU_LOST));
        dispatch(setGameEnd(true));
      }
      dispatch(clearTempWord());
      dispatch(pushToGrid(value));
      dispatch(setCurrentSelectedRow(currentSelectedRow + 1)); // Jump to the next row if game still going on
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
      dispatch(setAlertType(alertMessageType.GIVE_UP));
    } else {
      dispatch(setAlertType(alertMessageType.GAME_END));
    }
    dispatch(setGameEnd(true));
  };

  const resetGame = () => {
    dispatch(setCurrentSelectedRow(0));
    dispatch(clearTempWord());
    dispatch(clearGrid());
    dispatch(setCorrectWord(pickRandom(wordsList, letterLimit)));
    dispatch(setGameEnd(false));
    dispatch(setAlertType(alertMessageType.GUESS_FIRST_WORD));
  };

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterLimit, wordsList, chanceLimit]);

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
    <div className="flex flex-col gap-y-7">
      <Alert />
      <Header />
      <PlayBoard />
      <KeyBoard onKeyboardClick={keyPressHandler} />
      <CTA onRestart={onRestartHandler} onGiveUp={onGiveUpHandler} />
      <Footer />
    </div>
  );
}
