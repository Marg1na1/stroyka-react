import { stroykaApi } from '../stroyka.api';

type LoginDataType = {
    email: string;
    password: string;
}

type ResponseDataType = {
    token: string
}

const injectedRegistration = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseDataType, LoginDataType>({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useLoginMutation } = injectedRegistration;