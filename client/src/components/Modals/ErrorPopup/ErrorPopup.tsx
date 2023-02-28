import { FC } from 'react';
import { ErrorModel, toggleError } from 'redux/slices/errorSlice';
import { useAppDispatch } from 'redux/store';
import style from './ErrorPopup.module.scss';

const ErrorPopup: FC<ErrorModel> = ({ errorCode, errorMessage }) => {

    const dispatch = useAppDispatch()

    const onClickUpdate = () => {
        dispatch(toggleError(false))
        window.location.reload()
    }

    return (
        <div className={style['error']}>
            <h1 className={style['error-title']}>{errorCode}</h1>
            <p className={style['error-descr']}>{errorMessage}</p>
            <button
                className={style['error-btn']}
                onClick={onClickUpdate}>Закрыть</button>
        </div>
    );
}

export default ErrorPopup;