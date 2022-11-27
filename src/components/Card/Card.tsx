import React, { FC } from 'react';
import style from './Card.module.scss';
import clsx from 'clsx';

type testType = {
    img: string;
    title: string;
    price: number;
    discount: string;
    horizontal?: boolean;
    discountAmount?: number;
}

const Card: FC<testType> = ({ img, title, price, discount, horizontal = false, discountAmount }) => {

    const currentVievPrice: number = Math.round(((price - price / 100 * discountAmount!)));
    const currentPrice: number = ((price - price / 100 * discountAmount!));
    const truthCheck: boolean = discount === 'true';

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
                    <button className={clsx('btn-reset', style['grid-item__btn'])}>В корзину</button>
                </div>
                {
                    truthCheck && <span className={style['grid-item__discount']}>-{discountAmount}%</span>
                }
            </article>
        </li>
    );
}



export default Card;