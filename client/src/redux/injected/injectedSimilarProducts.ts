import { stroykaApi } from '../stroyka.api';
import { ProductModel } from '../../@types/models';

const injecteSimilarProducts = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getSimilar: builder.query<ProductModel[], string>({
            query: (type) => ({
                url: `products/`,
                params: {
                    count: 4
                }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'SimilarProducts' as const, id })), 'SimilarProducts']
                    : ['SimilarProducts'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetSimilarQuery } = injecteSimilarProducts;