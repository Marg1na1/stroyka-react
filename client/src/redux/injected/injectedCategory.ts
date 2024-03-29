import { stroykaApi } from 'redux/stroyka.api';
import { ProductModel } from 'types/models';

type QueryParamsType = {
    type: string;
    sortParams: string;
    range: number[];
    provider: string;
    search?: string;
}

const injectedCategory = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryItems: builder.query<ProductModel[], QueryParamsType>({
            query: (params) => ({
                url: `products/`,
                params: {
                    type: params.type,
                    sortBy: params.sortParams,
                    range: params.range, 
                    provider: params.provider,
                    q: params.search
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