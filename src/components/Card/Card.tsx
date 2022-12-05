import React, { FC } from 'react';
import style from './Card.module.scss';
import clsx from 'clsx';
import { TCard, TCartCard } from '../../@types/globalTypes';
import { useAddCartItemMutation, useChangeCartItemMutation, useGetCartQuery } from '../../redux/injected/injectedCart';

type testType = {
    id: number;
    fixId: number;
    img: string;
    title: string;
    provider: string;
    rating: number;
    price: number;
    type: number;
    discount: string;
    discountAmount?: number;
    horizontal?: boolean;
}

const Card: FC<testType> = ({ img, title, price, discount, horizontal = false, discountAmount, fixId, provider }) => {

    const currentVievPrice: number = Math.round(((price - price / 100 * discountAmount!)));
    const currentPrice: number = ((price - price / 100 * discountAmount!));
    const truthCheck: boolean = discount === 'true';
    const finalPrice: number = truthCheck ? currentVievPrice : price

    const obj = { img, title, finalPrice, fixId, provider, count: 0, id: 0 };


    const { data = [] } = useGetCartQuery();

    const [addCartItem] = useAddCartItemMutation();

    const [changeCartItem] = useChangeCartItemMutation();

    const addProduct = async (item: any) => {
        if (data.find((obj: any) => obj.fixId === item.fixId)) {
            const currentCount = data.find((obj: TCartCard) => obj.fixId === item.fixId)
            item.count += currentCount!.count + 1
            item.id = currentCount!.id
            await changeCartItem(item)
        } else {
            item.count += 1
            await addCartItem(item)
        }

    }

    return (
        <li className={style['grid-item']}>
            <article className={horizontal ? style['grid-item__content--h'] : style['grid-item__content']}>
                <img className={horizontal ? style['grid-item__image--h'] : style['grid-item__image']} src={img} alt='product' />
                <div className={style['grid-item__main']}>
                    <p className={style['grid-item__title']}>{title}</p>
                    <div className={style['grid-item__price']}>
                        <p className={style['grid-item__price--current']}>
                            {truthCheck ? currentVievPrice : price} ₽
                        </p>
                        {
                            truthCheck && <s className={style['grid-item__price--past']}>{price}</s>
                        }
                    </div>
                    <button className={clsx('btn-reset', style['grid-item__btn'])} onClick={() => addProduct(obj)}>В корзину</button>
                </div>
                {
                    truthCheck && <span className={style['grid-item__discount']}>-{discountAmount}%</span>
                }
            </article>
        </li>
    );
}



export default Card;