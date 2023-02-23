import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { getToken } from '../utils/getToken';

const baseQuery1 = retry(fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL,
    prepareHeaders: (headers) => {
        const token = getToken()

        if (token) {
            headers.set('X-Access-Token', token)
        }

        return headers
    },
}), { maxRetries: 1 })



export const stroykaApi = createApi({
    reducerPath: 'stroykaApi',
    tagTypes: ['Cart', 'Orders', 'Category', 'Discount', 'PopularProducts', 'Product', 'Reviews', 'Searched', 'SimilarProducts'],
    baseQuery: baseQuery1,
    refetchOnFocus: true,
    endpoints: () => ({}),
})

export const { } = stroykaApi;
