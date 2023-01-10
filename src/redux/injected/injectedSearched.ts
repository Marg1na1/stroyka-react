import { TCard } from './../../@types/globalTypes';
import { stroykaApi } from '../stroyka.api';

type TSearchedParams = {
    value: string;
    count: number;
}

const injectedSearched = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getSearched: builder.query<TCard[], TSearchedParams>({
            query: ({ count, value }) => ({
                url: `products/?search=${value}`,
                params: {
                    sortby: 'rating',
                    order: 'desc',
                    p: 1,
                    l: count,
                }
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetSearchedQuery } = injectedSearched;