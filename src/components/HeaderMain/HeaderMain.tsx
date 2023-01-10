import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import style from './HeaderMain.module.scss';
import HeaderSearch from '../HeaderSearch/HeaderSearch';

const logo = './../assets/images/logo_icon.svg';


const HeaderMain: FC = ({ }) => {

    const [isSticky, setIsSticky] = useState<boolean>(false);

    useEffect(() => {
        const header = document.getElementById("header-main");
        const sticky = header!.offsetTop;

        window.onscroll = () => toggleSticky();

        const toggleSticky = () => {
            if (window.pageYOffset > sticky) {
                setIsSticky(true);
            } else {
                setIsSticky(false)
            }
        }
    });

    return (
        <div id='header-main' className={isSticky ? clsx(style['header-main'], style['header-main--sticky']) : style['header-main']}>
            <div className={style['header-main__container']}>
                <Link to={'/'} className={style['header-logo']} > <img src={logo} alt={'logo'} /> </Link>
                <Link to={'catalog'} className={style['header-main-btn']}>
                    <div className={style['header-main-btn__lines']}>
                        <span></span>
                    </div>
                    <p className={style['header-main-btn__text']}>Каталог</p>
                </Link>
                <HeaderSearch isSticky={isSticky}/>
                <nav className={style['header-main-nav']}>
                    <Link to={'/profile'} className={style['header-main-nav__item']}>
                        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="m12 11c2.2091 0 4-1.7909 4-4s-1.7909-4-4-4c-2.2091 0-4 1.7909-4 4s1.7909 4 4 4z" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <p>Профиль</p>
                    </Link>
                    <Link to={'/orders'} className={style['header-main-nav__item']}>
                        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m21 16v-8c-4e-4 -0.35072-0.0929-0.69519-0.2685-0.99884-0.1755-0.30364-0.4278-0.5558-0.7315-0.73116l-7-4c-0.304-0.17553-0.6489-0.26795-1-0.26795s-0.696 0.09242-1 0.26795l-7 4c-0.30374 0.17536-0.55602 0.42752-0.73154 0.73116-0.17552 0.30365-0.2681 0.64812-0.26846 0.99884v8c3.6e-4 0.3507 0.09294 0.6952 0.26846 0.9988 0.17552 0.3037 0.4278 0.5558 0.73154 0.7312l7 4c0.304 0.1755 0.6489 0.268 1 0.268s0.696-0.0925 1-0.268l7-4c0.3037-0.1754 0.556-0.4275 0.7315-0.7312 0.1756-0.3036 0.2681-0.6481 0.2685-0.9988z" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="m3.27 6.96 8.73 5.05 8.73-5.05" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M12 22.08V12" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>

                        <p>Заказы</p>
                    </Link>
                    <Link to={'/cart'} className={style['header-main-nav__item']}>
                        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m9 22c0.55228 0 1-0.4477 1-1s-0.44772-1-1-1-1 0.4477-1 1 0.44772 1 1 1z" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="m20 22c0.5523 0 1-0.4477 1-1s-0.4477-1-1-1-1 0.4477-1 1 0.4477 1 1 1z" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#5D6066" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                        <p>Корзина</p>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default HeaderMain;