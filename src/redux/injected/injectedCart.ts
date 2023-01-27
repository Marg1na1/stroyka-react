import { stroykaApi } from '../stroyka.api';
import { CartProductModel } from '../../@types/models';

const injectedCart = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartProductModel[], void>({
            query: () => ({
                url: 'cart',
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Cart' as const, id })), 'Cart'] 
                    : ['Cart'],
        }),
        addCartItem: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `cart`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Cart'],
        }),
        changeCartItem: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `cart/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteCartItem: builder.mutation({
            query: (id) => ({
                url: `cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useAddCartItemMutation,
    useGetCartQuery,
    useLazyGetCartQuery,
    useChangeCartItemMutation,
    useDeleteCartItemMutation
} = injectedCart;