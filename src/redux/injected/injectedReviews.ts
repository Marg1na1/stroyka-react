import { ReviewModel } from '../../@types/models';
import { stroykaApi } from '../stroyka.api';

const injectedReviews = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<ReviewModel[], void>({
            query: () => ({
                url: 'reviews',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetReviewsQuery } = injectedReviews;