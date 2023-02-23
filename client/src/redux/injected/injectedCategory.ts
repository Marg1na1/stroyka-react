import { stroykaApi } from '../stroyka.api';
import { ProductModel } from '../../@types/models';

type QueryParmsType = {
    type: string;
    sortParams: string;
}

const injectedCategory = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryItems: builder.query<ProductModel[], QueryParmsType>({
            query: (params) => ({
                url: `products/`,
                params: {
                    type: params.type,
                    sortBy: params.sortParams
                }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Category' as const, id })), 'Category']
                    : ['Category'],
        }),

    }),
    overrideExisting: false,
})

export const {
    useGetCategoryItemsQuery
} = injectedCategory;