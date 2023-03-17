import { stroykaApi } from 'redux/stroyka.api';
import { ProductModel } from 'types/models';

const injectedDiscount = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getDiscountedProducts: builder.query<ProductModel[], void>({
            query: () => ({
                url: 'products/',
                params: {
                    count: 4,
                    discount: true
                }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Discount' as const, id })), 'Discount']
                    : ['Discount'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetDiscountedProductsQuery } = injectedDiscount;