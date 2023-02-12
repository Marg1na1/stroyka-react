import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const url = `https:/${process.env.REACT_APP_API_TOKEN}.mockapi.io/`;

export const stroykaApi = createApi({
    reducerPath: 'stroykaApi',
    tagTypes: ['Cart', 'Orders', 'Category', 'Discount', 'PopularProducts', 'Product', 'Reviews', 'Searched', 'SimilarProducts'],
    baseQuery: retry(fetchBaseQuery({ baseUrl: url }), { maxRetries: 1 }),
    refetchOnFocus: true,
    endpoints: () => ({}),
})

export const { } = stroykaApi;
