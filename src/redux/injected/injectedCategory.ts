import { TCartCard, TCard } from './../../@types/globalTypes';
import { stroykaApi } from '../stroyka.api';

const injectedCategory = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryItems: builder.query<TCard[], string>({
            query: (type) => ({
                url: `products?type=${type}`,
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