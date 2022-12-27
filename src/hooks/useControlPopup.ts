import { useEffect } from 'react';

export const useControlPopup = (state: boolean, setState: (x: boolean) => void, wrapper: React.MutableRefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        if (state === true) {
            const close = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setState(!state)
                }
            }
            window.addEventListener('keydown', close)

            return () => window.removeEventListener('keydown', close)
        }
    }, [state]);

    useEffect(() => {
        if (state === true) {

            const closeOnClick = (e: MouseEvent) => {
                if (wrapper.current !== null && e.target instanceof HTMLElement) {
                    if (wrapper.current.className === e.target.className) {
                        setState(false)
                    }
                }
            }
            window.addEventListener('click', closeOnClick)

            return () => window.removeEventListener('click', closeOnClick)
        }
    }, [state])

}