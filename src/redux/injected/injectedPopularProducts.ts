import { stroykaApi } from '../stroyka.api';
import { ProductModel } from '../../@types/models';

const injectedPopularProducts = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getPopularProducts: builder.query<ProductModel[], number>({
            query: (count) => ({
                url: 'products',
                params: {
                    sortby: 'rating',
                    order: 'desc',
                    p: 1,
                    l: count,
                }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'PopularProducts' as const, id })), 'PopularProducts']
                    : ['PopularProducts'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetPopularProductsQuery } = injectedPopularProducts;