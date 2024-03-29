import { stroykaApi } from 'redux/stroyka.api';
import { ProductModel } from 'types/models';

const injectedPopularProducts = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getPopularProducts: builder.query<ProductModel[], number>({
            query: (count) => ({
                url: 'products/',
                params: {
                    count: count,
                    sortBy: 'popular',
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