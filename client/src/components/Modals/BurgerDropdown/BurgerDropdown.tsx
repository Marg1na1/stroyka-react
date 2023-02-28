import { FC } from 'react';
import { additionalItems } from 'data/header.data';
import { CartIcon, Logotype, OrdersIcon, ProfileIcon } from 'icons';
import { Link } from 'react-router-dom';
import { setToggleOpenBurger } from 'redux/slices/popupSlice';
import { useAppDispatch } from 'redux/store';
import style from './BurgerDropdown.module.scss';

const BurgerDropdown: FC = () => {

    const dispatch = useAppDispatch();

    const closeBurger = () => {
        dispatch(setToggleOpenBurger(false))
    }

    return (
        <div className={style['dropdown']}>
            <div className='container'>
                <ul className={style['dropdown-list']}>
                    <li className={style['dropdown__item']} onClick={closeBurger}>
                        <Link to={'/'}>
                            <Logotype />
                        </Link>
                    </li>
                    <li className={style['dropdown__item']}>
                        <nav className={style['nav']}>
                            <Link to={'/profile'} className={style['nav__item']} onClick={closeBurger}>
                                <ProfileIcon />
                                <p>Профиль</p>
                            </Link>
                            <Link to={'/orders'} className={style['nav__item']} onClick={closeBurger}>
                                <OrdersIcon />
                                <p>Заказы</p>
                            </Link>
                            <Link to={'/cart'} className={style['nav__item']} onClick={closeBurger}>
                                <CartIcon />
                                <p>Корзина</p>
                            </Link>
                        </nav>
                    </li>
                    <li className={style['dropdown__item']}>
                        <ul className={style['scraps']}>
                            {
                                additionalItems.map((obj, i) => (<Link
                                    to={obj.path}
                                    className={style['scraps__item']}
                                    key={i}
                                    onClick={closeBurger}>{obj.content}</Link>))
                            }
                        </ul>
                    </li>
                    <li className={style['dropdown__item']}>
                        <Link
                            to={'/catalog'}
                            className={style['dropdown-btn']}
                            onClick={closeBurger}>
                            <div className={style['dropdown-btn__lines']}>
                                <span></span>
                            </div>
                            <p className={style['dropdown-btn__text']}>Каталог</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BurgerDropdown;