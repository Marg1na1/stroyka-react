import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { url } from './api-key.env';

export const stroykaApi = createApi({
    reducerPath: 'stroykaApi',
    tagTypes: [],
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    refetchOnFocus: true,
    endpoints: () => ({}),
})

export const { } = stroykaApi;