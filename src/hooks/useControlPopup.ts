import { useEffect } from 'react';
import { useAppDispatch } from './../redux/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const useControlPopup = (
    state: boolean,
    setState: ActionCreatorWithPayload<boolean>,
    wrapper?: React.MutableRefObject<HTMLDivElement | null>
) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (state === true) {
            const close = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    dispatch(setState(false))
                }
            }
            window.addEventListener('keydown', close)

            return () => window.removeEventListener('keydown', close)
        }
    }, [dispatch, setState, state]);

    useEffect(() => {
        if (state === true && wrapper !== undefined) {
            const closeOnClick = (e: MouseEvent) => {
                if (wrapper.current !== null && e.target instanceof HTMLElement) {
                    if (wrapper.current.className === e.target.className) {
                        dispatch(setState(false))
                    }
                }
            }
            window.addEventListener('click', closeOnClick)

            return () => window.removeEventListener('click', closeOnClick)
        }
    }, [dispatch, setState, state, wrapper]);

    const closeModal = () => {
        dispatch(setState(false))
    }

    return { closeModal }
}