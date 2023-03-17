import { ProductModel } from 'types/models';
import { stroykaApi } from 'redux/stroyka.api';

const injectedProducts = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query<ProductModel, string>({
            query: (id) => ({
                url: `products/${id}/`,
            }),
            providesTags: ['Product'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetProductQuery } = injectedProducts;