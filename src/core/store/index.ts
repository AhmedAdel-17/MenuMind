import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';
import feedbackReducer from './slices/feedbackSlice';
import insightsReducer from './slices/insightsSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        menu: menuReducer,
        feedback: feedbackReducer,
        insights: insightsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
