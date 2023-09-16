import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AlertState = {
    alertType: "",
};

export interface AlertState {
    alertType: string;
}

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlertType: (state, action: PayloadAction<string>) => {
            state.alertType = action.payload;
        },
    },
});

export const alertMessageType = {
    GUESS_FIRST_WORD: "GUESS_FIRST_WORD",
    GAME_END: "GAME_END",
    YOU_WON: "YOU_WON",
    GIVE_UP: "GIVE_UP",
    WORD_NOT_FOUND: "WORD_NOT_FOUND",
    YOU_LOST: "YOU_LOST",
};

// Action creators are generated for each case reducer function
export const { setAlertType } = alertSlice.actions;

export default alertSlice.reducer;
