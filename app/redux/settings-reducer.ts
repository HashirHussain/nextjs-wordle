import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SettingsState = {
    letterLimit: 4,
};

export interface SettingsState {
    letterLimit: number;
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateLetterLimit: (state, action: PayloadAction<number>) => {
            state.letterLimit = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateLetterLimit } = settingsSlice.actions;

export default settingsSlice.reducer;
