import { TOrdersType } from '../../@types/globalTypes';
import { stroykaApi } from '../stroyka.api';

const injectedOrders = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<TOrdersType[], void>({
            query: () => ({
                url: 'orders',
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Orders' as const, id })), 'Orders']
                    : ['Orders'],
        }),
        addOrder: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `orders`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Orders'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders'],
        }),
    }),

    overrideExisting: false,
})

export const { useGetOrdersQuery, useAddOrderMutation, useDeleteOrderMutation } = injectedOrders;