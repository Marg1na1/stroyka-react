import { FC, ReactNode } from 'react';
import { useControlPopup } from 'hooks/useControlPopup';
import { Portal } from './Portal';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import style from './Popup.module.scss';

type Props = {
    children: ReactNode;
    close: ActionCreatorWithPayload<boolean, string>;
    isOpen: boolean;
}

const Popup: FC<Props> = ({ children, close, isOpen }) => {

    const { closeModal } = useControlPopup(isOpen, close);

    if (!isOpen) {
        return null
    }

    return (
        <Portal>
            <div className={style['popup']} role='dialog'>
                <div
                    className={style['overlay']}
                    role='button'
                    onClick={closeModal}>
                    <button onClick={closeModal} className={style['close-btn']}></button>
                </div>
                <div className={style['content']}>{children}</div>
            </div>
        </Portal >
    );
}

export default Popup;