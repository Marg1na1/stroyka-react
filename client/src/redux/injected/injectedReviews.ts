import { ReviewModel } from 'types/models';
import { stroykaApi } from 'redux/stroyka.api';

const injectedReviews = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<ReviewModel[], void>({
            query: () => ({
                url: 'reviews/',
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ name }) => ({ type: 'Reviews' as const, name })), 'Reviews']
                    : ['Reviews'],
        }),
    }),
    overrideExisting: false,
})

export const { useGetReviewsQuery } = injectedReviews;