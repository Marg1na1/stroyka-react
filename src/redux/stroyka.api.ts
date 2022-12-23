import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = `https:/${process.env.REACT_APP_API_TOKEN}.mockapi.io/`;

export const stroykaApi = createApi({
    reducerPath: 'stroykaApi',
    tagTypes: ['Cart', 'Orders'],
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    refetchOnFocus: true,
    endpoints: () => ({}),
})

export const { } = stroykaApi;
