import clsx from 'clsx';
import { FC } from 'react';
import style from './Registration.module.scss';

const Registration: FC = ({ }) => {
    return (
        <section className={style['registration']}>
            <div className={style['registration-wrapper']}>
                <h1 className={style['registration__title']}>Регистриция</h1>
                <div className={style['registration-content']}>
                    <h2 className={style['registration-content__title']}>Личная информация</h2>
                    <ul className={style['registration-list']}>
                        <li className={style['registration-list__item']}>
                            <label htmlFor="" className={style['registration-item']}>
                                Имя
                                <input type="text" className={style['registration-input']} />
                            </label>
                            <label htmlFor="" className={style['registration-item']}>
                                Фамилия
                                <input type="text" className={style['registration-input']} />
                            </label>
                        </li>
                        <li className={style['registration-list__item']}>
                            <label htmlFor="" className={style['registration-item']}>
                                Дата рождения
                                <input type="date" className={style['registration-input']} />
                            </label>
                            <label htmlFor="" className={style['registration-item']}>
                                Телефон
                                <input type="number" className={style['registration-input']} />
                            </label>
                        </li>
                        <li className={style['registration-list__item']}>
                            <label htmlFor="" className={style['registration-item']}>
                                E-mail
                                <input type="mail" className={clsx(style['registration-input--long'], style['registration-input'])} />
                            </label>
                        </li>
                        <li className={style['registration-list__item']}>
                            <label htmlFor="" className={style['registration-item']}>
                                Пароль
                                <input type="password" className={style['registration-input']} />
                            </label>
                            <label htmlFor="" className={style['registration-item']}>
                                Подтверждение пароля
                                <input type="password" className={style['registration-input']} />
                            </label>
                        </li>
                    </ul>
                    <button className={style['registration-btn']}>Зарегестрироваться</button>
                </div>
            </div>
        </section>
    );
}

export default Registration;