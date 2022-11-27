import React, { FC } from 'react';
import style from './Header.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { additionalItems, navItem, breadCrumbs } from '../../data/header.data';

const logo = './../assets/images/logo_icon.svg';
const search_icon = './../assets/images/search_icon.svg';

const Header: FC = () => {
    return (
        <header className={style['header']}>
            <div className='container'>
                <div className={style['header-additional']}>
                    <div className={style['header-locate']}>
                        <button className={clsx(style['header-locate__btn'], 'btn-reset')}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34421 3.29018 4.43655 4.6967 3.03003C6.10322 1.62351 8.01088 0.833333 10 0.833333C11.9891 0.833333 13.8968 1.62351 15.3033 3.03003C16.7098 4.43655 17.5 6.34421 17.5 8.33333Z" stroke="#5D6066" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="#5D6066" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className={style['header-locate__city']}>Москва</p>
                        </button>

                    </div>
                    <nav className={style['header-additional__nav']}>
                        {
                            additionalItems.map((obj, i) => (<Link to={obj.path} className={style['header-additional__item']} key={i}>{obj.content}</Link>))
                        }
                    </nav>
                </div>
                <div className={style['header-main']}>
                    <Link to={'/'} className={style['header-logo']}> <img src={logo} /> </Link>
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