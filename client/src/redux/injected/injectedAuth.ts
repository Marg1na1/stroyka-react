import { stroykaApi } from '../stroyka.api';

type Response = {
    message: string
}

const injectedAuth = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        isAuth: builder.query<Response, void>({
            query: () => ({
                url: `/auth/me`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useIsAuthQuery } = injectedAuth;