import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useState, useLayoutEffect, useEffect } from 'react';
import { setError } from '../redux/slices/errorSlice';
import { useAppDispatch } from '../redux/store';

type ErrorHandlerProps = {
    error: FetchBaseQueryError | SerializedError | undefined;
    isError: boolean;
    isClient?: boolean;
    errorMessage?: string;
}

export const useErrorHandler = ({ error, isError, isClient = false, errorMessage }: ErrorHandlerProps) => {

    const dispatch = useAppDispatch();

    const [errorData, setErrorData] = useState<FetchBaseQueryError>({
        status: 100,
        data: 'status'
    })
    useLayoutEffect(() => {
        if (error) {
            if ('status' in error) {
                setErrorData(error)
            }
        }

    }, [error, isError])

    useEffect(() => {
        if (isClient && isError && errorMessage) {
            dispatch(setError({
                errorCode: errorData.status,
                errorMessage: errorMessage,
                isError: true
            }))
        }
    }, [error, isError, errorData, isClient, errorMessage, dispatch])

    return errorData;
}