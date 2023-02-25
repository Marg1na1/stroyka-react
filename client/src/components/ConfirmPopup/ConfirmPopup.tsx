import { FC } from 'react';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useSelector } from 'react-redux';
import { useDeleteOrderMutation } from '../../redux/injected/injectedOrders';
import { RootState, useAppDispatch } from '../../redux/store';
import { setToggleOpenConfirm } from '../../redux/slices/confirmPopupSlice';
import clsx from 'clsx';
import style from './ConfirmPopup.module.scss';

const ConfirmPopup: FC = ({ }) => {

    const despatch = useAppDispatch();

    const deletedId = useSelector((state: RootState) => state.confirmPopupSlice.deletedId);

    const [deleteOrder, deleteStatuses] = useDeleteOrderMutation();

    const deleteErrorHandlerData = {
        error: deleteStatuses.error,
        isError: deleteStatuses.isError,
        isClient: true,
        errorMessage: 'Произошла ошибка при попытке отмены заказа',
    }

    useErrorHandler({ ...deleteErrorHandlerData })

    const cencelOrder = () => {
        deleteOrder(deletedId)
        despatch(setToggleOpenConfirm(false))
    }

    const closeConfirm = () => {
        despatch(setToggleOpenConfirm(false))
    }

    return (
        <div className={style['popup']}>
            <h1 className={style['title']}>Вы точно хотите отменить заказ?</h1>
            <p className={style['descr']}>Возможно заказать по старой цене уже не получиться</p>
            <div className={style['btns']}>
                <button className={clsx(style['btn'], style['btn--cencel'])} onClick={cencelOrder}>Отменить</button>
                <button className={clsx(style['btn'], style['btn--close'])} onClick={closeConfirm}>Закрыть</button>
            </div>
        </div>
    );
}

export default ConfirmPopup; 