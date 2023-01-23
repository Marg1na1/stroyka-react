import { FC, useEffect, useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import ChangeLocateModal from '../ChangeLocateModal/ChangeLocateModal';
import HeaderMain from '../HeaderMain/HeaderMain';
import Confirm from '../Confirm/Confirm';
import { useLocate } from '../../hooks/useLocate';
import { additionalItems, breadCrumbs, } from '../../data/header.data';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setToggleChengeLocate } from '../../redux/slices/popupSlice';
import style from './Header.module.scss';

const Header: FC = () => {

    const [headerIsSticky, setHeaderIsSticky] = useState(false);

    const isOpenConfirm = useSelector((state: RootState) => state.confirmSlice.isOpen);
    const isOpenLocateModal = useSelector((state: RootState) => state.popupSlice.isOpenChengeLocate);
    const isOpenAuth = useSelector((state: RootState) => state.popupSlice.isOpenAuth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isOpenLocateModal === true || isOpenAuth === true) {
            window.scrollTo(0, 0)
            document.body.style.overflow = 'hidden';
        } else if (isOpenLocateModal === false || isOpenAuth === false) {
            document.body.style.overflow = 'visible';
        }
    }, [isOpenLocateModal, isOpenAuth]);

    const locate = useLocate();

    const onClickLocate = () => {
        dispatch(setToggleChengeLocate(true))
    }

    return (
        <header className={style['header']}>
            {isOpenAuth && <LoginModal />}
            {isOpenLocateModal && <ChangeLocateModal />}
            <div className={style['container']}>
                <div className={headerIsSticky ? clsx(style['header-additional'], style['header-additional--sticky']) : style['header-additional']}>
                    {isOpenConfirm && <Confirm />}
                    <div className={style['header-locate']} onClick={onClickLocate}>
                        <button className={clsx(style['header-locate__btn'], 'btn-reset')} >
                            <svg fill='none' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' width={20} height={20}>
                                <path d='m17.5 8.3333c0 5.8334-7.5 10.833-7.5 10.833s-7.5-5-7.5-10.833c0-1.9891 0.79018-3.8968 2.1967-5.3033s3.3142-2.1967 5.3033-2.1967c1.9891 0 3.8968 0.79018 5.3033 2.1967s2.1967 3.3142 2.1967 5.3033z' stroke='#5D6066' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' />
                                <path d='m10 10.833c1.3807 0 2.5-1.1192 2.5-2.5 0-1.3807-1.1193-2.5-2.5-2.5-1.3807 0-2.5 1.1193-2.5 2.5 0 1.3807 1.1193 2.5 2.5 2.5z' stroke='#5D6066' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' />
                            </svg>
                            <p className={style['header-locate__city']}>{locate}</p>
                        </button>
                    </div>
                    <nav className={style['header-additional__nav']}>
                        {
                            additionalItems.map((obj, i) => (<Link to={obj.path} className={style['header-additional__item']} key={i}>{obj.content}</Link>))
                        }
                    </nav>
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