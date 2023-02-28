import { FC, memo, useEffect } from 'react';
import { BurgerDropdown } from './BurgerDropdown';
import { ChangeLocateModal } from './ChangeLocateModal';
import { LoginModal } from './LoginModal';
import { ErrorPopup } from './ErrorPopup';
import { ConfirmPopup } from './ConfirmPopup';
import { Popup } from 'components/Popup';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { setToggleChengeLocate, setToggleOpenAuth } from 'redux/slices/popupSlice';
import { toggleError } from 'redux/slices/errorSlice';
import { setToggleOpenConfirm } from 'redux/slices/confirmPopupSlice';
import style from './Modals.module.scss';

const Modals: FC = memo(() => {

    const isOpenLocateModal = useSelector((state: RootState) => state.popupSlice.isOpenChengeLocate);
    const isOpenAuth = useSelector((state: RootState) => state.popupSlice.isOpenAuth);
    const isOpenBurger = useSelector((state: RootState) => state.popupSlice.isOpenBurger);
    const isErrorOpen = useSelector((state: RootState) => state.errorSlice);
    const isConfirmOpen = useSelector((state: RootState) => state.confirmPopupSlice.isOpenConfirm);

    useEffect(() => {
        if (isOpenLocateModal || isOpenAuth || isOpenBurger || isErrorOpen.isError || isConfirmOpen) {
            document.body.style.overflow = 'hidden';
        } else if (!isOpenLocateModal && !isOpenAuth && !isOpenBurger && !isErrorOpen.isError && !isConfirmOpen) {
            document.body.style.overflow = 'visible';
        }
    }, [isOpenLocateModal, isOpenAuth, isOpenBurger, isErrorOpen.isError, isConfirmOpen]);

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
            <Popup close={setToggleOpenConfirm} isOpen={isConfirmOpen}>
                <ConfirmPopup />
            </Popup>
            {isOpenBurger && <BurgerDropdown />}
        </div>
    );
})

export default Modals;