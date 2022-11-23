import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url: string = 'https://637bbd1b72f3ce38ea9419fb.mockapi.io/';

export const stroykaApi = createApi({
    reducerPath: 'stroykaApi',
    tagTypes: [],
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    refetchOnFocus: true,
    endpoints: (builder) => ({
        getproducts: builder.query<any, void>({
            query: () => 'products',
        }),
    }),
})

export const { useGetproductsQuery } = stroykaApi