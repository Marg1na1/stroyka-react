import { FC } from 'react';
import { CartProductModel } from '../../@types/models';
import style from './OrderItem.module.scss';

const OrderItem: FC<CartProductModel> = ({ img, title, finalPrice, count }) => {

    return (
        <li className={style['order-item']}>
            <img src={img} alt={title} height={131} width={180} />
            <div className={style['order-item__main']}>
                <p className={style['order-item__title']}>{title}</p>
                <b className={style['order-item__price']}>{finalPrice} ₽</b>
                <p className={style['order-item__count']}>{count} шт</p>
            </div>
        </li>
    );
}

export default OrderItem;