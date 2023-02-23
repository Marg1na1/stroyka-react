import { FC } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import OrderSkeleton from '../Skeletons/OrderSkeleton';
import { ResponseOrderModel } from '../../@types/models';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { getCurrentPrice } from '../../utils/getCurrentPrice';
import { useDeleteOrderMutation } from '../../redux/injected/injectedOrders';
import style from './OrderCard.module.scss';

type TOrderCard = {
    obj: ResponseOrderModel;
    isLoading: boolean;
}

const OrderCard: FC<TOrderCard> = ({ obj, isLoading }) => {

    const totalPrice = obj.items.reduce((acc, current) => acc + (getCurrentPrice(current.product.price, current.product.discountAmount) * +current.count), 0);

    const [deleteOrder, deleteStatuses] = useDeleteOrderMutation();

    const deleteErrorHandlerData = {
        error: deleteStatuses.error,
        isError: deleteStatuses.isError,
        isClient: true,
        errorMessage: 'Произошла ошибка при попытке отмены заказа',
    }

    useErrorHandler({ ...deleteErrorHandlerData })

    const cancelOrder = () => {
        deleteOrder(obj.id)
    }

    const renderSkeleton = [...new Array(2)].map((_, index) => <OrderSkeleton key={index} />);
    const renderOrders = obj.items.map((order) => <OrderItem key={order.product.id} {...order} />);

    const orderDate = new Date(obj.createdAt).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).split(' ').slice(0, 2).join(' ');

    return (
        <li className={style['order-card']}>
            <ul className={style['order-list']}>
                {isLoading ? renderSkeleton : renderOrders}
            </ul>
            <div className={style['order-info']}>
                <div className={style['order-info__wrapper']}>
                    <div className={style['order-info__top']}>
                        <div className={style['order__date']}>
                            Заказ от {orderDate}
                        </div>
                        <div className={style['order-status']}>
                            <b className={style['order-status__title']}>Статус </b>
                            <p>Оплачен</p>
                        </div>
                    </div>
                    <div className={style['order-info__footer']}>
                        <button
                            className={style['order__btn']}
                            onClick={cancelOrder}>Отменить заказ</button>
                        <b className={style['order__total']}>
                            Итого:&nbsp;{totalPrice}&nbsp;₽
                        </b>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default OrderCard;