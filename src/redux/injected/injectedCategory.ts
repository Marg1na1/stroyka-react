import { stroykaApi } from '../stroyka.api';
import { ProductModel } from '../../@types/models';

const injectedCategory = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryItems: builder.query<ProductModel[], { type: string, p: number }>({
            query: ({ type, p }) => ({
                url: `products`,
                params: {
                    type: type,
                    p: p,
                    l: 18,
                }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Categoty' as const, id })), 'Categoty']
                    : ['Categoty'],
        }),

    }),
    overrideExisting: false,
})

export const {
    useGetCategoryItemsQuery
} = injectedCategory;