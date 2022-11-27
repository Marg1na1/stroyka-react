import { TCard } from './../../@types/globalTypes';
import { stroykaApi } from '../stroyka.api';

const injectedPopularProducts = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getPopularProducts: builder.query<TCard[], void>({
            query: () => ({
                url: 'products',
                params: {
                    sortby: 'rating',
                    order: 'desc',
                    p: 1,
                    l: 12,
                }
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetPopularProductsQuery } = injectedPopularProducts;