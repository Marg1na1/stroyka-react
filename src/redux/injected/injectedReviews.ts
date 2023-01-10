import { TReviews } from '../../@types/globalTypes';
import { stroykaApi } from '../stroyka.api';

const injectedReviews = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<TReviews[], void>({
            query: () => ({
                url: 'reviews',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetReviewsQuery } = injectedReviews;