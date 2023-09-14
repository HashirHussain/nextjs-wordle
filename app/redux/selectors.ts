import type { RootState } from "../redux/store";

export const letterLimit = (state: RootState): number => state.settings.letterLimit

