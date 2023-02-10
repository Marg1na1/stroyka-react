import { stroykaApi } from '../stroyka.api';
import { ProductModel } from '../../@types/models';

const injecteSimilarProducts = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getSimilar: builder.query<ProductModel[], string>({
            query: (type) => ({
                url: `products`,
                params: {
                    type: type,
                    p: 1,
                    l: 4,
                }
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetSimilarQuery } = injecteSimilarProducts;