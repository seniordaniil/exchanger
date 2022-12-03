import { configureStore } from '@reduxjs/toolkit';
import { exchanger } from 'features/exchanger';

export const store = configureStore({
  reducer: {
    exchanger,
  },
});

export type RootState = ReturnType<typeof store.getState>;
