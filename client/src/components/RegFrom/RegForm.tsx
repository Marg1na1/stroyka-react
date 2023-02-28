import { FC } from 'react';
import { InputsModel } from 'types/models';
import { useForm } from 'react-hook-form';
import style from './RegForm.module.scss';

type Props = {
    onSubmit: (data: InputsModel) => void
}

const RegForm: FC<Props> = ({ onSubmit }) => {

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: {
            errors
        }
    } = useForm<InputsModel>({ mode: 'onChange' });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul className={style['registration-list']}>
                <li className={style['registration-list__item']}>
                    <label className={style['registration-item']}>
                        Имя
                        <input
                            {...register('name', {
                                required: 'Поле обязательно к заполнению',
                                pattern: {
                                    value: /^[А-ЯЁ]+$/i,
                                    message: 'В качестве имени можно использовать только кириллицу'
                                }
                            })}
                            className={style['registration-input']}
                        />
                        {errors?.name && <p>{errors?.name?.message}</p>}
                    </label>
                    <label className={style['registration-item']}>
                        Фамилия
                        <input
                            {...register('surname', {
                                pattern: {
                                    value: /^[А-ЯЁ]+$/i,
                                    message: 'В качестве фамилии можно использовать только кириллицу'
                                }
                            })}
                            className={style['registration-input']}
                            name='surname' />
                        {errors?.surname && <p>{errors?.surname?.message}</p>}
                    </label>
                </li>
                <li className={style['registration-list__item']}>
                    <label className={style['registration-item']}>
                        Дата рождения
                        <input
                            {...register('birthDay', {
                                pattern: {
                                    value: /(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/,
                                    message: 'Проверьте правильность введенной даты'
                                }
                            })}
                            type='date'
                            className={style['registration-input']} />
                        {errors?.birthDay && <p>{errors?.birthDay?.message}</p>}
                    </label>
                    <label className={style['registration-item']}>
                        Телефон
                        <input
                            {...register('tel', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 11,
                                    message: 'Минимум 11 символов'
                                },
                                pattern: {
                                    value: /^((\+7|7|8)+([0-9]){10})$/,
                                    message: 'Проверьте номер телефона и повторите попытку'
                                }
                            })}
                            type='number'
                            className={style['registration-input']} />
                        {errors?.tel && <p>{errors?.tel?.message}</p>}
                    </label>
                </li>
                <li className={style['registration-list__item']}>
                    <label className={style['registration-item']}>
                        E-mail
                        <input
                            {...register('email', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 9,
                                    message: 'Минимум 9 символов'
                                },
                                pattern: {
                                    value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                                    message: 'Попробуйте ввести почту еще раз'
                                }
                            })}
                            className={style['registration-input']}
                            name='email' />
                        {errors?.email && <p>{errors?.email?.message}</p>}
                    </label>
                </li>
                <li className={style['registration-list__item']}>
                    <label className={style['registration-item']}>
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
                            className={style['registration-input']}
                            type='password' />
                        {errors?.password && <p>{errors?.password?.message}</p>}
                    </label>
                    <label className={style['registration-item']}>
                        Подтверждение пароля
                        <input
                            {...register('cpassword', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 9,
                                    message: 'Пароль должен состоять минимум из 9 символов'
                                },
                                validate: (value) => {
                                    const { password } = getValues();
                                    return password === value || 'Пароли не совпадают!';
                                }
                            })}
                            className={style['registration-input']}
                            type='password' />
                        {errors?.cpassword && <p>{errors?.cpassword?.message}</p>}
                    </label>
                </li>
            </ul>
            <button
                type='submit'
                className={style['registration-btn']}>Зарегестрироваться</button>
        </form>
    )
}

export default RegForm;