import { FC, useEffect, useState } from 'react';
import style from './Header.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { additionalItems, navItem, breadCrumbs, } from '../../data/header.data';
import LoginModal from '../LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setCords, setLocality } from '../../redux/slices/locateSlice';
import ChangeLocateModal from '../ChangeLocateModal/ChangeLocateModal';

const logo = './../assets/images/logo_icon.svg';
const search_icon = './../assets/images/search_icon.svg';

const Header: FC = () => {

    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [popupState, setPopupState] = useState<boolean>(false);
    const [changeLocate, setChangeLocate] = useState<boolean>(false);

    const cords = useSelector((state: RootState) => state.locate.cords);
    const locality = useSelector((state: RootState) => state.locate.locality);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (changeLocate === true) {
            window.scrollTo(0, 0)
            document.body.style.overflow = 'hidden';
        } else if (changeLocate === false) {
            document.body.style.overflow = 'visible';
        }
    }, [changeLocate])

    const getLocate = () => {
        if (cords.latitude !== null) {
            fetch(`https://api.geotree.ru/address.php?key=${process.env.REACT_APP_GEOCODER_KEY}&lon=${cords.longitude}&lat=${cords.latitude}&level=1`)
                .then(response => response.json())
                .then(city => console.log(city))
            // .then(response => response[0].oktmo_name.split(' ').splice(response[0].oktmo_name.split(' ').indexOf('город') + 1, response[0].oktmo_name.split(' ').length - 1).join(' '))
            // .then((city: string) => {
            //     sessionStorage.setItem('location', city)
            //     return city
            // })
            // .then(city => dispatch(setLocality(city)))
        }
    }

    const getCords = () => {
        navigator.geolocation.getCurrentPosition(position => {
            dispatch(setCords(
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            ))
        })
    }

    useEffect(() => {
        if (sessionStorage.getItem('location') === null) {
            if ("geolocation" in navigator) {
                getCords()
            }
            getLocate()
        } else {
            dispatch(setLocality(sessionStorage.location))
        }
    });

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
        <header className={style['header']}>
            {loginOpen && <LoginModal setLoginOpen={setLoginOpen} loginOpen={loginOpen} />}
            {popupState && null}
            {changeLocate && <ChangeLocateModal setChangeLocate={setChangeLocate} changeLocate={changeLocate} />}
            <div className='container'>
                <div className={style['header-additional']}>
                    <div className={style['header-locate']} onClick={() => setChangeLocate(true)}>
                        <button className={clsx(style['header-locate__btn'], 'btn-reset')} >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34421 3.29018 4.43655 4.6967 3.03003C6.10322 1.62351 8.01088 0.833333 10 0.833333C11.9891 0.833333 13.8968 1.62351 15.3033 3.03003C16.7098 4.43655 17.5 6.34421 17.5 8.33333Z" stroke="#5D6066" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="#5D6066" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className={style['header-locate__city']}>{locality}</p>
                        </button>
                    </div>
                    <nav className={style['header-additional__nav']}>
                        {
                            additionalItems.map((obj, i) => (<Link to={obj.path} className={style['header-additional__item']} key={i}>{obj.content}</Link>))
                        }
                    </nav>
                </div>
                <div id='header-main' className={isSticky ? clsx(style['header-main'], style['header-main--sticky']) : style['header-main']}>
                    <Link to={'/'} className={style['header-logo']} > <img src={logo} /> </Link>
                    <Link to={'catalog'} className={style['header-main-btn']}>
                        <div className={style['header-main-btn__lines']}>
                            <span></span>
                        </div>
                        <p className={style['header-main-btn__text']}>Каталог</p>
                    </Link>
                    <form className={style['header-form']}>
                        <input className={clsx(style['header-form__input'], 'input-reset')} />
                        <button className={clsx(style['header-form__btn'], 'btn-reset')}>
                            <img src={search_icon} />
                        </button>
                    </form>
                    <nav className={style['header-main-nav']}>
                        {
                            navItem.map((obj, i) => (
                                <Link to={obj.path} className={style['header-main-nav__item']} key={i}>
                                    <img src={obj.img} />
                                    <p>{obj.text}</p>
                                </Link>
                            ))
                        }
                    </nav>
                </div>
                <div className={style['header-breadCrumbs']}>
                    <ul className={style['header-breadCrumbs-list']}>
                        {
                            breadCrumbs.map((crumb, i) => (
                                <Link to={crumb.path} key={i}>
                                    <p>{crumb.text}</p>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;