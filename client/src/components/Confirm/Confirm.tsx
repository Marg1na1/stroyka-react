import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { setToggleConfirm } from 'redux/slices/confirmSlice';
import { setToggleChengeLocate } from 'redux/slices/popupSlice';
import { RootState, useAppDispatch } from 'redux/store';
import clsx from 'clsx';
import style from './Confirm.module.scss';

const Confirm: FC = memo(() => {

    const confirmBody = useSelector((state: RootState) => state.confirmSlice.body);
    const dispatch = useAppDispatch();

    const onClickAccept = () => {
        if (confirmBody.type === 'defined') {
            dispatch(setToggleConfirm(false))
        } else if (confirmBody.type === 'undefined') {
            dispatch(setToggleConfirm(false))
            dispatch(setToggleChengeLocate(true))
        } else if (confirmBody.type === 'error') {
            dispatch(setToggleConfirm(false))
            dispatch(setToggleChengeLocate(true))
        }
    }

    const onClickCancel = () => {
        if (confirmBody.type === 'defined') {
            dispatch(setToggleConfirm(false))
            dispatch(setToggleChengeLocate(true))
        } else if (confirmBody.type === 'undefined') {
            dispatch(setToggleConfirm(false))
            sessionStorage.setItem('location', 'Москва')
        } else if (confirmBody.type === 'error') {
            dispatch(setToggleConfirm(false))
            sessionStorage.setItem('location', 'Москва')
        }
    }

    return (
        <div className={style['confirm']}>
            <p className={style['confirm-message']}>
                {confirmBody.message}
            </p>
            <div className={style['confirm__btns']}>
                <button
                    className={clsx(style['confirm-accept'], style['confirm-btn'])}
                    onClick={onClickAccept}>ОК</button>
                <button
                    className={clsx(style['confirm-cancel'], style['confirm-btn'])}
                    onClick={onClickCancel}>Отмена</button>
            </div>
        </div>
    );
})

export default Confirm;