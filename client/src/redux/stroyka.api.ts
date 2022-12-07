import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_TOKEN } from './api-key.env';

const url = `https:/${API_TOKEN}/.mockapi.io/`

export const stroykaApi = createApi({
    reducerPath: 'stroykaApi',
    tagTypes: ['Cart'],
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    refetchOnFocus: true,
    endpoints: () => ({}),
})

export const { } = stroykaApi;