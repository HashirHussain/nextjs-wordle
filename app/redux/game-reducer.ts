import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GameState = {
  gameEnd: false,
  correctWord: "",
  currentSelectedRow: 0,
  tempWord: [],
  grid: [],
};

export interface GameState {
  gameEnd: boolean;
  correctWord: string;
  currentSelectedRow: number;
  tempWord: Array<string>;
  grid: Array<Array<string>>;
}

export const gameSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setGameEnd,
  setCurrentSelectedRow,
  pushToTempWord,
  popFromTempWord,
  clearTempWord,
  setCorrectWord,
  pushToGrid,
  clearGrid
} = gameSlice.actions;

export default gameSlice.reducer;
