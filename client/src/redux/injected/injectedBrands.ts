import { BrandsModel } from 'types/models';
import { stroykaApi } from 'redux/stroyka.api';

const injectedBrands = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<BrandsModel[], void>({
            query: () => ({
                url: `brands/`,
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetBrandsQuery
} = injectedBrands;