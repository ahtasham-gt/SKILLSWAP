import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import skillsReducer from './slices/skillsSlice';
import swapsReducer from './slices/swapsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
    swaps: swapsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
}); 