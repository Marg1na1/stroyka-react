import { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useControlPopup } from '../../hooks/useControlPopup';
import style from './LoginModal.module.scss';

type TLoginInputs = {
    email: string;
    password: string;
}

type LoginModalProps = {
    setLoginOpen: (x: boolean) => void;
    loginOpen: boolean;
}

const LoginModal: FC<LoginModalProps> = ({ setLoginOpen, loginOpen }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm<TLoginInputs>({
        mode: 'onChange'
    });

    const wrapper = useRef<HTMLDivElement | null>(null);

    useControlPopup(loginOpen, setLoginOpen, wrapper)

    return (
        <div className={style['login-wrapper']} ref={wrapper}>
            <div className={style['login']}>
                <h1 className={style['login__title']}>Вход</h1>
                <form className={style['login-form']}>
                    <label className={style['login__item']}>
                        E-mail
                        <input
                            {...register("email", {
                                required: "Поле обязательно к заполнению ",
                                minLength: {
                                    value: 9,
                                    message: 'Минимум 9 символов'
                                },
                                pattern: {
                                    value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                                    message: 'Попробуйте ввести почту еще раз'
                                }
                            })}
                            className={style['login-input']}
                            name={'email'} />
                        {errors?.email && <p>{errors?.email?.message}</p>}
                    </label>
                    <label className={style['login__item']}>
                        Пароль
                        <input
                            {...register('password', {
                                required: "Поле обязательно к заполнению ",
                                minLength: {
                                    value: 9,
                                    message: 'Пароль должен состоять минимум из 9 символов'
                                },
                                pattern: {
                                    value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                    message: 'Пароль должен содержать строчные, прописные латинские буквы, цифры и спецсимволы'
                                }
                            })}
                            className={style['login-input']}
                            type="password" />
                        {errors?.password && <p>{errors?.password?.message}</p>}
                    </label>
                    <button type='submit' className={style['login-submit']}>Войти</button>
                    <Link to={'/reg'} className={style['login-link']}>Создать учетную запись</Link>
                </form>
            </div>
            <div className={style['login-close__container']}>
                <button className={style['login-close']} onClick={() => setLoginOpen(false)}></button>
            </div>
        </div>
    );
}

export default LoginModal;