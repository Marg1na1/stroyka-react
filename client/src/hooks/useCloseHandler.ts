import { RefObject, useEffect } from 'react';

export const useCloseHandler = (
    depen: string,
    state: boolean,
    setFn: (x: boolean) => void,
    ref: RefObject<HTMLFormElement>

) => {

    useEffect(() => {

        const closeOnClick = (e: MouseEvent) => {
            if (state === true && ref.current !== null) {
                if (!ref.current.contains(e.target as HTMLElement)) {
                    setFn(false)
                }
            }
        }
        window.addEventListener('click', closeOnClick)

        return () => window.removeEventListener('click', closeOnClick)

    }, [depen, ref, setFn, state]);
}