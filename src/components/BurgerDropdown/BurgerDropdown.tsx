import { FC } from 'react';
import { Link } from 'react-router-dom';
import { additionalItems } from '../../data/header.data';
import CartIcon from '../../Icons/CartIcon';
import Logotype from '../../Icons/Logotype';
import OrdersIcon from '../../Icons/OrdersIcon';
import ProfileIcon from '../../Icons/ProfileIcon';
import style from './BurgerDropdown.module.scss';

const BurgerDropdown: FC = () => {
    return (
        <div className={style['dropdown']}>
            <div className='container'>
                <ul className={style['dropdown-list']}>
                    <li className={style['dropdown__item']}>
                        <Link to={'/'}>
                            <Logotype />
                        </Link>
                    </li>
                    <li className={style['dropdown__item']}>
                        <nav className={style['nav']}>
                            <Link to={'/profile'} className={style['nav__item']}>
                                <ProfileIcon />
                                <p>Профиль</p>
                            </Link>
                            <Link to={'/orders'} className={style['nav__item']}>
                                <OrdersIcon />
                                <p>Заказы</p>
                            </Link>
                            <Link to={'/cart'} className={style['nav__item']}>
                                <CartIcon />
                                <p>Корзина</p>
                            </Link>
                        </nav>
                    </li>
                    <li className={style['dropdown__item']}>
                        <ul className={style['scraps']}>
                            {
                                additionalItems.map((obj, i) => (<Link to={obj.path} className={style['scraps__item']} key={i}>{obj.content}</Link>))
                            }
                        </ul>
                    </li>
                    <li className={style['dropdown__item']}>
                        <Link to={'/catalog'} className={style['dropdown-btn']}>
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