import { stroykaApi } from '../stroyka.api';
import { ProductModel } from '../../@types/models';

type TSearchedParams = {
    value: string;
    count: number;
}

const injectedSearched = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getSearched: builder.query<ProductModel[], TSearchedParams>({
            query: ({ count, value }) => ({
                url: `products/`,
                params: {
                    q: value,
                    count: count,
                }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Searched' as const, id })), 'Searched']
                    : ['Searched'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetSearchedQuery } = injectedSearched;