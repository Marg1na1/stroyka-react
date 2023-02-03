import { FC, useEffect } from 'react';
import BurgerDropdown from '../BurgerDropdown/BurgerDropdown';
import ChangeLocateModal from '../ChangeLocateModal/ChangeLocateModal';
import LoginModal from '../LoginModal/LoginModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import style from './Modals.module.scss';

const Modals: FC = () => {

    const isOpenLocateModal = useSelector((state: RootState) => state.popupSlice.isOpenChengeLocate);
    const isOpenAuth = useSelector((state: RootState) => state.popupSlice.isOpenAuth);
    const isOpenBurger = useSelector((state: RootState) => state.popupSlice.isOpenBurger);

    useEffect(() => {
        if (isOpenLocateModal === true || isOpenAuth === true || isOpenBurger === true) {
            window.scrollTo(0, 0)
            document.body.style.overflow = 'hidden';
        } else if (isOpenLocateModal === false && isOpenAuth === false && isOpenBurger === false) {
            document.body.style.overflow = 'visible';
        }
    }, [isOpenLocateModal, isOpenAuth, isOpenBurger]);

    return (
        <div className={style['modals']}>
            {isOpenAuth && <LoginModal />}
            {isOpenLocateModal && <ChangeLocateModal />}
            {isOpenBurger && <BurgerDropdown />}
        </div>
    );
}

export default Modals;