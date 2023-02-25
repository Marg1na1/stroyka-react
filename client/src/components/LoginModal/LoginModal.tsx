import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../redux/injected/injectedLogin';
import { setToggleOpenAuth } from '../../redux/slices/popupSlice';
import { useAppDispatch } from '../../redux/store';
import style from './LoginModal.module.scss';

type TLoginInputs = {
    email: string;
    password: string;
}

const LoginModal: FC = () => {

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

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(setToggleOpenAuth(false))
    }

    const [loginUser] = useLoginMutation();

    const onSubmit = async (data: TLoginInputs) => {
        const response = await loginUser(data)
        if ('data' in response) {
            document.cookie = `token=${response.data.token}`;
            closeModal()
        } else {
            reset()
        }
    }

    return (
        <div className={style['login']}>
            <h1 className={style['login__title']}>Вход</h1>
            <form className={style['login-form']} onSubmit={handleSubmit(onSubmit)}>
                <label className={style['login__item']}>
                    E-mail
                    <input
                        {...register('email', {
                            required: 'Поле обязательно к заполнению ',
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
                            required: 'Поле обязательно к заполнению',
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
                        type='password' />
                    {errors?.password && <p>{errors?.password?.message}</p>}
                </label>
                <button type='submit' className={style['login-submit']}>Войти</button>
                <Link
                    to={'/reg'}
                    className={style['login-link']}
                    onClick={closeModal}>Создать учетную запись</Link>
            </form>
        </div>
    );
}

export default LoginModal;