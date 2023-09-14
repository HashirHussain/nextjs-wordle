import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SettingsState = {
    letterLimit: 4,
    chanceLimit: 6
};

export interface SettingsState {
    letterLimit: number;
    chanceLimit: number;
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setLetterLimit: (state, action: PayloadAction<number>) => {
            state.letterLimit = action.payload;
        },
        setChanceLimit: (state, action: PayloadAction<number>) => {
            state.chanceLimit = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLetterLimit, setChanceLimit } = settingsSlice.actions;

export default settingsSlice.reducer;
