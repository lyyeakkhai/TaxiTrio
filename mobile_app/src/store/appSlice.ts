import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScreenType = 'home' | 'booking' | 'activity' | 'concierge' | 'profile';

interface AppState {
  currentScreen: ScreenType;
}

const initialState: AppState = {
  currentScreen: 'home',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentScreen(state, action: PayloadAction<ScreenType>) {
      state.currentScreen = action.payload;
    },
  },
});

export const { setCurrentScreen } = appSlice.actions;
export default appSlice.reducer;
