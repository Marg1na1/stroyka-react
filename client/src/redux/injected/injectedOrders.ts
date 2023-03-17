import { ResponseOrderModel, SentOrderModel } from 'types/models';
import { stroykaApi } from 'redux/stroyka.api';

const injectedOrders = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<ResponseOrderModel[], void>({
            query: () => ({
                url: 'orders',
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Orders' as const, id })), 'Orders']
                    : ['Orders'],
        }),
        addOrder: builder.mutation<void, SentOrderModel>({
            query: (data) => ({
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