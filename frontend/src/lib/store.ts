import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/src/entities/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;