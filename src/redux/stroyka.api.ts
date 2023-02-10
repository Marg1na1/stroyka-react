import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const url = `https:/${process.env.REACT_APP_API_TOKEN}.mockapi.io/`;


export const stroykaApi = createApi({
    reducerPath: 'stroykaApi',
    tagTypes: ['Cart', 'Orders', 'Categoty'],
    baseQuery: retry(fetchBaseQuery({ baseUrl: url }), { maxRetries: 1 }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: () => ({}),
    
})

export const { } = stroykaApi;
