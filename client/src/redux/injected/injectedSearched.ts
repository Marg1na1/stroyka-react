import { stroykaApi } from 'redux/stroyka.api';
import { ProductModel } from 'types/models';

type SearchedParamsType = {
    value: string;
    count?: number;
    sort: string;
    provider?: string;
    range?: number[];
}

const injectedSearched = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getSearched: builder.query<ProductModel[], SearchedParamsType>({
            query: ({ count, value, sort, range, provider }) => ({
                url: `products/`,
                params: {
                    q: value,
                    count,
                    sortBy: sort,
                    range,
                    provider,
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