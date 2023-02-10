import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, useState } from 'react';

type ErrorHandlerProps = {
    error: FetchBaseQueryError | SerializedError | undefined;
    isError: boolean;
}
export const useErrorHandler = ({ error, isError }: ErrorHandlerProps) => {
    const [errorData, setErrorData] = useState<FetchBaseQueryError>({
        status: 100,
        data: 'status'
    })
    useEffect(() => {
        if (error) {
            if ('status' in error) {
                setErrorData(error) 
            }
        }

    }, [error, isError])

    return errorData;
}