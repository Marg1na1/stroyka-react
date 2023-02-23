import { stroykaApi } from '../stroyka.api';

const injectedAuth = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        isAuth: builder.query<any, void>({
            query: () => ({
                url: `/auth/me`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useIsAuthQuery } = injectedAuth;