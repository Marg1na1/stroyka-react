import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {stroykaApi} from './stroykaAPI';

export const store = configureStore({
    reducer: {
        [stroykaApi.reducerPath]: stroykaApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stroykaApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;