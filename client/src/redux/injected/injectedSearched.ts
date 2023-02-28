import { stroykaApi } from '../stroyka.api';
import { ProductModel } from '../../types/models';

type TSearchedParams = {
    value: string;
    count?: number;
    sort?: string;
}

const injectedSearched = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getSearched: builder.query<ProductModel[], TSearchedParams>({
            query: ({ count, value, sort }) => ({
                url: `products/`,
                params: {
                    q: value,
                    count: count,
                    sortBy: sort
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