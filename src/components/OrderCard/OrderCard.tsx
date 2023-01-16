import { FC, ReactElement, useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import style from './OrderCard.module.scss';
import { useDeleteOrderMutation } from '../../redux/injected/injectedOrders';
import { OrderModel } from '../../@types/models';

const OrderCard: FC<OrderModel> = (obj) => {

    const [total, setTotal] = useState(0);
    const [deleteOrder] = useDeleteOrderMutation();

    const cancelOrder = (id: string) => {
        deleteOrder(id)
    }

    const orderItemsArr: ReactElement[] = [];

    for (let v in obj) {
        if (typeof obj[v] === 'object') {
            orderItemsArr.push(<OrderItem key={obj[v].id} {...obj[v]} />)
        }
    }

    useEffect(() => {
        setTotal(orderItemsArr.reduce((acc, obj) => acc + obj.props.finalPrice * obj.props.count, 0))
    }, [orderItemsArr]);

    const orderDate = new Date(obj.createdAt).toLocaleString("ru", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).split(' ').slice(0, 2).join(' ');

    return (
        <li className={style['order-card']}>
            <ul className={style['order-list']}>
                {
                    orderItemsArr
                }
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
                            onClick={() => cancelOrder(obj.id)}>Отменить заказ</button>
                        <b className={style['order__total']}>
                            Итого: {total} ₽
                        </b>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default OrderCard;