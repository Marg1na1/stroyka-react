import { FC, memo, useEffect } from 'react';
import BurgerDropdown from '../BurgerDropdown/BurgerDropdown';
import ChangeLocateModal from '../ChangeLocateModal/ChangeLocateModal';
import LoginModal from '../LoginModal/LoginModal';
import Popup from '../Popup/Popup';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setToggleChengeLocate, setToggleOpenAuth } from '../../redux/slices/popupSlice';
import { toggleError } from '../../redux/slices/errorSlice';
import style from './Modals.module.scss';

const Modals: FC = memo(() => {

    const isOpenLocateModal = useSelector((state: RootState) => state.popupSlice.isOpenChengeLocate);
    const isOpenAuth = useSelector((state: RootState) => state.popupSlice.isOpenAuth);
    const isOpenBurger = useSelector((state: RootState) => state.popupSlice.isOpenBurger);
    const isErrorOpen = useSelector((state: RootState) => state.errorSlice.data)

    useEffect(() => {
        if (isOpenLocateModal || isOpenAuth || isOpenBurger || isErrorOpen.isError) {
            document.body.style.overflow = 'hidden';
        } else if (!isOpenLocateModal && !isOpenAuth && !isOpenBurger && !isErrorOpen.isError) {
            document.body.style.overflow = 'visible';
        }
    }, [isOpenLocateModal, isOpenAuth, isOpenBurger, isErrorOpen.isError]);

    return (
        <div className={style['modals']}>
            <Popup close={setToggleChengeLocate} isOpen={isOpenLocateModal}>
                <ChangeLocateModal />
            </Popup>
            <Popup close={setToggleOpenAuth} isOpen={isOpenAuth}>
                <LoginModal />
            </Popup>
            <Popup close={toggleError} isOpen={isErrorOpen.isError}>
                <ErrorPopup {...isErrorOpen} />
            </Popup>
            {isOpenBurger && <BurgerDropdown />}
        </div>
    );
})

export default Modals;