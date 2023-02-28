import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useState, useEffect } from 'react';
import { setError } from 'redux/slices/errorSlice';
import { useAppDispatch } from 'redux/store';
import { setToggleOpenAuth } from 'redux/slices/popupSlice';

type Props = {
    error: FetchBaseQueryError | SerializedError | undefined;
    isError: boolean;
    isClient?: boolean;
    errorMessage?: string;
}

export const useErrorHandler = ({ error, isError, isClient = false, errorMessage }: Props) => {

    const dispatch = useAppDispatch();

    const [errorData, setErrorData] = useState<FetchBaseQueryError>({
        status: 100,
        data: 'status'
    })

    useEffect(() => {
        if (error) {
            if ('status' in error) {
                setErrorData(error)
                if (error.status === 401) {
                    dispatch(setToggleOpenAuth(true))
                }
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
    }, [error, isError, errorData, isClient, errorMessage])

    return errorData;
}