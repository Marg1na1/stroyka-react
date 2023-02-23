import { stroykaApi } from '../stroyka.api';

type RegDataType = {
    lastName: string;
    name: string;
    email: string;
    password: string;
}

const injectedRegistration = stroykaApi.injectEndpoints({
    endpoints: (builder) => ({
        registrate: builder.mutation<void, RegDataType>({
            query: (data) => ({
                url: `/auth/sign_up`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useRegistrateMutation } = injectedRegistration;