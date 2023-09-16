import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings-reducer";
import gameReducer from "./game-reducer";
import alertReducer from "./alert-reducer";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        game: gameReducer,
        alert: alertReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
