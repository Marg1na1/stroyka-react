import { useEffect } from 'react';
import { useAppDispatch } from './../redux/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const useControlPopup = (
    state: boolean,
    setState: ActionCreatorWithPayload<boolean>,
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

    const closeModal = () => {
        dispatch(setState(false))
    }

    return { closeModal }
}