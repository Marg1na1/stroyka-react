import { FC } from 'react';
import style from './ErrorSection.module.scss';

type ErrorSectionProps = {
    errorCode: number | string ;
    errorMessage: string;
}

const ErrorSection: FC<ErrorSectionProps> = ({ errorCode, errorMessage }) => {

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div className={style['error']}>
            <h2 className={style['error-code']}>{errorCode ? errorCode : 'Ошибка'}</h2>
            <p className={style['error-descr']}>{errorMessage}</p>
            <button className={style['btn']} type='button' onClick={refreshPage}>Обновить</button>
        </div>
    );
}

export default ErrorSection;