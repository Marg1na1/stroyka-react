import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { stroykaApi } from './stroyka.api';
import isAuthSlice from './slices/authSlice';
import locateSlice from './slices/locateSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        [stroykaApi.reducerPath]: stroykaApi.reducer,
        isAuth: isAuthSlice,
        locate: locateSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stroykaApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();