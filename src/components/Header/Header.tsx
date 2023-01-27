import { FC, useEffect, useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import ChangeLocateModal from '../ChangeLocateModal/ChangeLocateModal';
import HeaderMain from '../HeaderMain/HeaderMain';
import Confirm from '../Confirm/Confirm';
import Locate from '../../Icons/Locate';
import BurgerDropdown from '../BurgerDropdown/BurgerDropdown';
import Burger from '../Burger/Burger';
import { useLocate } from '../../hooks/useLocate';
import { additionalItems, breadCrumbs, } from '../../data/header.data';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setToggleChengeLocate } from '../../redux/slices/popupSlice';
import style from './Header.module.scss';

const parametrs = {
    size: {
        width: 20,
        height: 20
    },
    color: '#5D6066'
}

const Header: FC = () => {

    const [headerIsSticky, setHeaderIsSticky] = useState(false);

    const isOpenConfirm = useSelector((state: RootState) => state.confirmSlice.isOpen);
    const isOpenLocateModal = useSelector((state: RootState) => state.popupSlice.isOpenChengeLocate);
    const isOpenAuth = useSelector((state: RootState) => state.popupSlice.isOpenAuth);
    const isOpenBurger = useSelector((state: RootState) => state.popupSlice.isOpenBurger);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isOpenLocateModal === true || isOpenAuth === true || isOpenBurger === true) {
            window.scrollTo(0, 0)
            document.body.style.overflow = 'hidden';
        } else if (isOpenLocateModal === false && isOpenAuth === false && isOpenBurger === false) {
            document.body.style.overflow = 'visible';
        }
    }, [isOpenLocateModal, isOpenAuth, isOpenBurger]);

    const locate = useLocate();

    const onClickLocate = () => {
        dispatch(setToggleChengeLocate(true))
    }

    return (
        <header className={style['header']}>
            {isOpenAuth && <LoginModal />}
            {isOpenLocateModal && <ChangeLocateModal />}
            {isOpenBurger && <BurgerDropdown />}
            <div className={style['container']}>
                <div className={headerIsSticky ? clsx(style['header-additional'], style['header-additional--sticky']) : style['header-additional']}>
                    {isOpenConfirm && <Confirm />}
                    <div className={style['header-locate']} onClick={onClickLocate}>
                        <button className={clsx(style['header-locate__btn'], 'btn-reset')} >
                            <Locate {...parametrs} />
                            <p className={style['header-locate__city']}>{locate}</p>
                        </button>
                    </div>
                    <nav className={style['header-additional__nav']}>
                        {
                            additionalItems.map((obj, i) => (<Link to={obj.path} className={style['header-additional__item']} key={i}>{obj.content}</Link>))
                        }
                    </nav>
                    <Burger />
                </div>
                <HeaderMain setHeaderIsSticky={setHeaderIsSticky} headerIsSticky={headerIsSticky} />
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
        </header >
    );
}

export default Header;