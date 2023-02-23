import { FC, useEffect, useState } from 'react';
import { CartProductModel } from '../../@types/models';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import BoxIcon from '../../Icons/BoxIcon';
import InfoIcon from '../../Icons/InfoIcon';
import TruckIcon from '../../Icons/TruckIcon';
import { useAddOrderMutation } from '../../redux/injected/injectedOrders';
import { getCurrentPrice } from '../../utils/getCurrentPrice';
import style from './CartSide.module.scss';

const CartSide: FC<{ data: CartProductModel[] }> = ({ data }) => {

    const [providers, setProviders] = useState<string[]>([]);

    const productCount = data.reduce((acc, current) => acc + +current.count, 0);
    const totalPrice = data.reduce((acc, current) => acc + (getCurrentPrice(current.product.price, current.product.discountAmount) * +current.count), 0);

    useEffect(() => {
        setProviders(Array.from(new Set(data.map((obj) => obj.product.provider))))
    }, [data])

    const [addOrder, addOrderStatuses] = useAddOrderMutation();

    const addOrderErrorHandlerData = {
        error: addOrderStatuses.error,
        isError: addOrderStatuses.isError,
        isClient: true,
        errorMessage: 'Произошла ошибка при попытке оформления заказа',
    }

    useErrorHandler({ ...addOrderErrorHandlerData })

    const orderObj = {
        items: data.map((obj) => {
            return {
                product: obj.product.id,
                count: obj.count
            }
        })
    }

    const clickAddOrder = async () => {
        await addOrder(orderObj)
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
                            <p className={style['side-list__title']}>Поставщик{providers.length > 1 && 'и'}</p>
                            <div className={style['side-list__value']}>{providers.map((item, i) => <p key={i}>{item}</p>)}</div>
                        </li>
                    </ul>
                </div>
                <button className={style['side-btn']
                } onClick={clickAddOrder}>Оформить заказ</button>
            </div>
            <div className={style['side-info']}>
                <div className={style['side-info__item']}>
                    <InfoIcon />
                    <p className={style['side-info__content']}>Можно сделать заказ от разных поставщиков</p>
                </div>
                <div className={style['side-info__item']}>
                    <BoxIcon />
                    <p className={style['side-info__content']}>Доставка осуществляется курьерами поставщика или службой курьеров Достависта. Также товар можно забрать самостоятельно от поставщика</p>
                </div>
                <div className={style['side-info__item']}>
                    <TruckIcon />
                    <p className={style['side-info__content']}>Точная сумма доставки будет определена после после подтверждения заказа</p>
                </div>
            </div>
        </aside>
    );
}

export default CartSide;