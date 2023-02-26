import { FC, useCallback } from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import RegForm from './RegFrom/RegForm';
import { InputsModel } from '../../@types/models';
import { useRegistrateMutation } from '../../redux/injected/injectedRegistration';
import style from './Registration.module.scss';

const Registration: FC = () => {

    useScrollToTop();

    const [createUser] = useRegistrateMutation();

    const onSubmit = useCallback((data: InputsModel) => {
        createUser({ name: data.name, lastName: data.surname, email: data.email, password: data.password })
    }, [])

    return (
        <section className={style['registration']}>
            <div className={style['registration-wrapper']}>
                <h1 className={style['registration__title']}>Регистрация</h1>
                <div className={style['registration-content']}>
                    <h2 className={style['registration-content__title']}>Личная информация</h2>
                    <RegForm onSubmit={onSubmit} />
                </div>
            </div>
        </section>
    );
}

export default Registration;