import { FC } from 'react';
import { TransmittedData } from '../../@types/models';
import { useAddProduct } from '../../hooks/useAddProduct';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import style from './Card.module.scss';

type TCardProps = {
    id: string;
    fixId: number;
    img: string;
    title: string;
    provider: string;
    rating: number;
    price: number;
    type: string;
    discount: string;
    discountAmount?: number;
    horizontal?: boolean;
}

const Card: FC<TCardProps> = ({ img, title, price, discount, horizontal = false, discountAmount, fixId, provider }) => {

    const currentPrice: number = Math.round(price - price / 100 * discountAmount!);
    const isDiscounted: boolean = discount === 'true';

    const addProduct = useAddProduct();

    const obj: TransmittedData = {
        img,
        title,
        finalPrice: isDiscounted ? currentPrice : price,
        fixId,
        provider,
        count: 1,
        id: 0
    };

    const onClickAddProduct = (obj: TransmittedData) => {
        addProduct(obj)
    }

    return (
        <li className={style['grid-item']}>
            <article className={horizontal ? style['grid-item__content--h'] : style['grid-item__content']}>
                <Link to={`/products/${fixId}`}>
                    <img className={horizontal ? style['grid-item__image--h'] : style['grid-item__image']} src={img} alt='product' />
                </Link>
                <div className={style['grid-item__main']}>
                    <Link to={`/products/${fixId}`}>
                        <h2 className={style['grid-item__title']}>{title}</h2>
                    </Link>
                    <div className={style['grid-item__price']}>
                        <p className={style['grid-item__price--current']}>
                            {isDiscounted ? currentPrice : price} ₽
                        </p>
                        {
                            isDiscounted && <s className={style['grid-item__price--past']}>{price}</s>
                        }
                    </div>
                    <button className={clsx('btn-reset', style['grid-item__btn'])} onClick={() => onClickAddProduct(obj)}>В корзину</button>
                </div>
                {
                    isDiscounted && <span className={style['grid-item__discount']}>-{discountAmount}%</span>
                }
            </article>
        </li>
    );
}

export default Card;