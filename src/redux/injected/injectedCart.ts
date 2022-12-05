import {  TCartCard } from './../../@types/globalTypes';
import { stroykaApi } from '../stroyka.api';

const injectedCart = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<TCartCard[], void>({
            query: () => ({
                url: 'cart',
            }),
            providesTags: (result) =>
            result
                ? [...result.map(({ id }) => ({ type: 'CartItems' as const, id })), 'CartItems']
                : ['CartItems'],
        }),
        addCartItem: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `cart`,
                method: 'POST',
                body: data,
            }),
        }),
        changeCartItem: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `cart/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteCartItem: builder.mutation({
            query: (id) => ({
                url: `cart/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useAddCartItemMutation,
    useGetCartQuery,
    useChangeCartItemMutation,
    useDeleteCartItemMutation
} = injectedCart;