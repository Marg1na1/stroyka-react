import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { stroykaApi } from './stroyka.api';
import isAuthSlice from './slices/authSlice';

export const store = configureStore({
    reducer: {
        [stroykaApi.reducerPath]: stroykaApi.reducer,
        isAuth: isAuthSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stroykaApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;