import { useEffect, useState, useLayoutEffect } from 'react';
import { useIsAuthQuery } from '../redux/injected/injectedAuth';

export const useIsAuth = () => {

    const { data, isSuccess, isError } = useIsAuthQuery();
    const [isCorrectToken, setIsCorrectToken] = useState<boolean | null>(null);

    useEffect(() => {
        if (isSuccess) {
            setIsCorrectToken(data.message === "ok")
        } else if (isError) {
            setIsCorrectToken(false)
        }

    }, [isSuccess, isError])

    if (isCorrectToken !== null) {
        return isCorrectToken
    }
}