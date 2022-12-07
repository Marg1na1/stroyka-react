import { TCard } from './../../@types/globalTypes';
import { stroykaApi } from '../stroyka.api';

const injectedDiscount = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getDiscountedProducts: builder.query<TCard[], void>({
            query: () => ({
                url: 'products',
                params: {
                    discount: 'true',
                    p: 1,
                    l: 4,
                }
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetDiscountedProductsQuery } = injectedDiscount;