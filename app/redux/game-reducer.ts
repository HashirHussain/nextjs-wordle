import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GameState = {
  dictionary: [],
  gameEnd: false,
  correctWord: "",
  currentSelectedRow: 0,
  tempWord: [],
  grid: [],
  gamePaused: false,
  challengeMode: false,
};

export interface GameState {
  dictionary: Array<string>;
  gameEnd: boolean;
  correctWord: string;
  currentSelectedRow: number;
  tempWord: Array<string>;
  grid: Array<Array<string>>;
  gamePaused: boolean;
  challengeMode: boolean;
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDictionary: (state, action: PayloadAction<Array<string>>) => {
      state.dictionary = action.payload;
    },
    setGameEnd: (state, action: PayloadAction<boolean>) => {
      state.gameEnd = action.payload;
    },
    setCurrentSelectedRow: (state, action: PayloadAction<number>) => {
      state.currentSelectedRow = action.payload;
    },
    pushToTempWord: (state, action: PayloadAction<string>) => {
      state.tempWord = [...state.tempWord, action.payload];
    },
    popFromTempWord: (state) => {
      const value = state.tempWord;
      if (value.length > 0) {
        value.pop();
        state.tempWord = [...value];
      }
    },
    clearTempWord: (state) => {
      state.tempWord = initialState.tempWord;
    },
    setCorrectWord: (state, action: PayloadAction<string>) => {
      state.correctWord = action.payload;
    },
    pushToGrid: (state, action: PayloadAction<Array<string>>) => {
      state.grid[state.currentSelectedRow] = action.payload;
    },
    clearGrid: (state) => {
      state.grid = [];
    },
    setGamePaused: (state, action: PayloadAction<boolean>) => {
      state.gamePaused = action.payload;
    },
    setChallengeMode: (state, action: PayloadAction<boolean>) => {
      state.challengeMode = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setDictionary,
  setGameEnd,
  setCurrentSelectedRow,
  pushToTempWord,
  popFromTempWord,
  clearTempWord,
  setCorrectWord,
  pushToGrid,
  clearGrid,
  setGamePaused,
  setChallengeMode,
} = gameSlice.actions;

export default gameSlice.reducer;
