import { RefObject, useEffect } from 'react';

export const useCloseHandler = (depen: string, setFn: (x: boolean) => void, ref: RefObject<HTMLFormElement>) => {

    useEffect(() => {

        const closeOnClick = (e: MouseEvent) => {

            if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
                setFn(true)
            } else {
                setFn(false)
            }
        }
        window.addEventListener('click', closeOnClick)

        return () => window.removeEventListener('click', closeOnClick)

    }, [depen]);
}