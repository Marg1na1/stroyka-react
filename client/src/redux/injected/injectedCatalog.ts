import { CatalogModel } from 'types/models';
import { stroykaApi } from 'redux/stroyka.api';

const injectedCatalog = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getCatalog: builder.query<CatalogModel[], void>({
            query: () => ({
                url: `catalog/`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetCatalogQuery
} = injectedCatalog;