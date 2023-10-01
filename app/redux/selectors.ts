import type { RootState } from "../redux/store";

export const dictionary = (state: RootState): Array<string> =>
    state.game.dictionary;

export const letterLimit = (state: RootState): number =>
    state.settings.letterLimit;

export const chanceLimit = (state: RootState): number =>
    state.settings.chanceLimit;

export const gameEnd = (state: RootState): boolean => state.game.gameEnd;

export const currentSelectedRow = (state: RootState): number =>
    state.game.currentSelectedRow;

export const tempWord = (state: RootState): Array<string> =>
    state.game.tempWord;

export const gamePaused = (state: RootState): boolean => state.game.gamePaused;

export const correctWord = (state: RootState): string => state.game.correctWord;

export const grid = (state: RootState): Array<Array<string>> => state.game.grid;

export const alertType = (state: RootState): string => state.alert.alertType;
