import { FC } from 'react';
import { CartProductModel } from '../../@types/models';
import { useAddOrderMutation } from '../../redux/injected/injectedOrders';
import style from './CartSide.module.scss';

const info_icon = './../assets/images/info_icon.svg';
const order_icon = './../assets/images/order_icon.svg';
const truck_icon = './../assets/images/truck_icon.svg';

type CartSideProps = {
    data: CartProductModel[]
}

const CartSide: FC<CartSideProps> = ({ data }) => {

    const productCount = data.reduce((acc, current) => acc + current.count, 0);
    const totalPrice = data.reduce((acc, current) => acc + (current.finalPrice * current.count), 0);

    const [addOrder] = useAddOrderMutation();

    const clickAddOrder = async (data: CartProductModel[]) => {
        await addOrder(data)
    }

    return (
        <aside className={style['side']}>
            <div className={style['side-main']}>
                <div className={style['side-container']}>
                    <h2 className={style['side-title']}>
                        Итого
                    </h2>
                    <ul className={style['side-list']}>
                        <li className={style['side-list__item']}>
                            <p className={style['side-list__title']}>Количество товара</p>
                            <p className={style['side-list__value']}>{productCount} шт.</p>
                        </li>
                        <li className={style['side-list__item']}>
                            <p className={style['side-list__title']}>Товаров на сумму</p>
                            <p className={style['side-list__value']}>{totalPrice} ₽</p>
                        </li>
                        <li className={style['side-list__item']}>
                            <p className={style['side-list__title']}>Поставщик</p>
                            <p className={style['side-list__value']}> </p>
                        </li>
                    </ul>
                </div>
                <button className={style['side-btn']} onClick={() => clickAddOrder(data)}>Оформить заказ</button>
            </div>
            <div className={style['side-info']}>
                <div className={style['side-info__item']}>
                    <img src={info_icon} alt="icon" width={24} height={24} />
                    <p className={style['side-info__content']}>Можно сделать заказ от разных поставщиков</p>
                </div>
                <div className={style['side-info__item']}>
                    <img src={order_icon} alt="icon" width={24} height={24} />
                    <p className={style['side-info__content']}>Доставка осуществляется курьерами поставщика или службой курьеров Достависта. Также товар можно забрать самостоятельно от поставщика</p>
                </div>
                <div className={style['side-info__item']}>
                    <img src={truck_icon} alt="icon" width={24} height={24} />
                    <p className={style['side-info__content']}>Точная сумма доставки будет определена после после подтверждения заказа</p>
                </div>
            </div>
        </aside>
    );
}

export default CartSide;