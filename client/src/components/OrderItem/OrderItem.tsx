import { FC } from 'react';
import { OrderCardModel } from '../../types/models';
import { getCurrentPrice } from 'utils/getCurrentPrice';
import style from './OrderItem.module.scss';

const OrderItem: FC<OrderCardModel> = ({ count, product }) => {

    return (
        <li className={style['order-item']}>
            <img src={product.img} alt={product.title} height={131} width={180} />
            <div className={style['order-item__main']}>
                <p className={style['order-item__title']}>{product.title}</p>
                <b className={style['order-item__price']}>{getCurrentPrice(product.price, product.discountAmount) * count}  ₽</b>
                <p className={style['order-item__count']}>{count} шт</p>
            </div>
        </li>
    );
}

export default OrderItem;