import { FC, useEffect, useRef } from 'react';
import { HeaderSearch } from '../HeaderSearch';
import { Logotype } from '../../../Icons/Logotype';
import { ProfileIcon } from '../../../Icons/ProfileIcon';
import { OrdersIcon } from '../../../Icons/OrdersIcon';
import { CartIcon } from '../../../Icons/CartIcon';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import style from './HeaderMain.module.scss';

type HeaderMainProps = {
    setHeaderIsSticky: (x: boolean) => void;
    headerIsSticky: boolean;
}

const HeaderMain: FC<HeaderMainProps> = ({ setHeaderIsSticky, headerIsSticky }) => {

    const header = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (header.current !== null) {
            const sticky = header.current.offsetTop;

            window.onscroll = () => toggleSticky();

            const toggleSticky = () => {
                if (window.pageYOffset > sticky) {
                    setHeaderIsSticky(true);
                } else {
                    setHeaderIsSticky(false)
                }
            }
        }

    }, [header, setHeaderIsSticky]);

    return (
        <div ref={header} className={clsx(style['header-main'], {
            [style['header-main--sticky']]: headerIsSticky
        })}>
            <div className={style['header-main__container']}>
                <Link to={'/'} className={style['header-logo']} >
                    <Logotype />
                </Link>
                <Link to={'/catalog'} className={style['header-main-btn']}>
                    <div className={style['header-main-btn__lines']}>
                        <span></span>
                    </div>
                    <p className={style['header-main-btn__text']}>Каталог</p>
                </Link>
                <HeaderSearch />
                <nav className={style['header-main-nav']}>
                    <Link to={'/profile'} className={style['header-main-nav__item']}>
                        <ProfileIcon />
                        <p>Профиль</p>
                    </Link>
                    <Link to={'/orders'} className={style['header-main-nav__item']}>
                        <OrdersIcon />
                        <p>Заказы</p>
                    </Link>
                    <Link to={'/cart'} className={style['header-main-nav__item']}>
                        <CartIcon />
                        <p>Корзина</p>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default HeaderMain;