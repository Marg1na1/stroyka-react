import { ProductModel } from '../../@types/models';
import { stroykaApi } from '../stroyka.api';

const injectedProducts = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query<ProductModel, string>({
            query: (id) => ({
                url: `products/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetProductQuery } = injectedProducts;